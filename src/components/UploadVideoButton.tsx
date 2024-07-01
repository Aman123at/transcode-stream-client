import { FC } from "react";
import {
  getPresignedURL,
  uploadOnSuccess,
  uploadVideoToPresignedURL,
} from "../api-calls/videoApis";
import { useVideoContext } from "../context/VideoContextProvider";

const UploadVideoButton: FC<{ isDashboardPage?: boolean }> = ({
  isDashboardPage,
}) => {
  const { setVideos, videos } = useVideoContext();
  const handleUploadVideoFile = async (event: any) => {
    if (event.target.files) {
      const video = event.target.files[0];
      console.log(video);
      const formData = new FormData();
      formData.append("video", video);
      const { data, error } = await getPresignedURL(formData);
      if (error) {
        console.log("Something went wrong getting presigned url", error);
      }
      if (data && data.url) {
        console.log("Presigned", data.url);
        try {
          const response = await uploadVideoToPresignedURL(data.url, video,video.type);
          if (response && response === "success") {
            const { data, error } = await uploadOnSuccess(video.name);
            if (data) {
              console.log("Success", data);
              const uploadedVideo = data.video;
              setVideos!([...videos, uploadedVideo]);
            }
            if (error) {
              console.log("Error", error);
            }
          } else {
            console.log("Something went wrong while uploading video");
          }
        } catch (error) {
          console.log("ErRRor", error);
        }
      }
    }
  };
  return (
    <>
      <label
        htmlFor="file-upload"
        className={`btn btn-accent ${
          isDashboardPage ? "w-full" : "w-[200px] "
        } mt-5 mb-3 mx-auto text-white`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#ffffff"
          className="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
            clip-rule="evenodd"
          />
        </svg>
        Upload Video
      </label>
      <input
        type="file"
        id="file-upload"
        onChange={handleUploadVideoFile}
        hidden
      />
    </>
  );
};

export default UploadVideoButton;
