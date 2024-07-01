import { SyntheticEvent, useEffect } from "react";
import { useVideoContext } from "../context/VideoContextProvider";
import { Video } from "../interfaces-ts/videoInterfaces";
import { deleteVideo, downloadVideo, retrieveTranscodeLogs } from "../api-calls/videoApis";
import { formatDuration, getStatusColor, truncateText } from "../utils/helper";

const VideoCard = ({ video }: { video: Video }) => {
  const { selectedVideo, setSelectedVideo, fetchVideos } = useVideoContext();
  const handleDownload = async (e:SyntheticEvent)=>{
    e.stopPropagation()   // preventation of event bubbling
    await downloadVideo(video.transcode_id,video.video_file_name)
  }
  const handleDeleteVideo = async (e:SyntheticEvent)=>{
    e.stopPropagation()   // preventation of event bubbling
    const {data,error} = await deleteVideo(video.transcode_id)
    if(error){
      console.log("Something went wrong while deleting video",error)
    }
    if(data){
      console.log("Video deleted successfully")
      fetchVideos!()
    }
  }
  useEffect(() => {
    if (
      video &&
      (video.status === "queued" || video.status === "in-progress")
    ) {
      // poll for logs
      const interval = setInterval(async () => {
        const { data, error } = await retrieveTranscodeLogs(video.transcode_id);
        if (error) {
          clearInterval(interval);
        }
        if (data) {
          const { current_status } = data;
          if (current_status === "active" || current_status === "error") {
            fetchVideos!();
            clearInterval(interval);
          }
          if (video.status !== current_status) {
            // fetch updated videos
            fetchVideos!();
          }
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div
      key={video._id}
      className={`flex hover:bg-gray-200 hover:dark:bg-slate-700 cursor-pointer items-center p-3 ${
        (selectedVideo===video.transcode_id) ? "border-2 bg-gray-200 dark:bg-slate-700 border-green-500 dark:border-green-600" : "border border-black dark:border-white"
      } rounded-lg w-full mt-2`}
      onClick={()=>{
        if(video.status === "active"){
          setSelectedVideo!(video.transcode_id);
        }
      }}
    >
      {video.status === "active" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-16 text-black dark:text-white"
        >
          <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
        </svg>
      ) : (
        <span className="loading loading-spinner text-warning w-12 h-12"></span>
      )}
      <div className="ml-3">
        <p className="text-lg font-bold text-black dark:text-white">
        {truncateText(video.video_file_name,28)}
        </p>
        <div className="flex items-center">
          <p className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4 text-black dark:text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span className="text-sm ml-1 text-black dark:text-white">
              {formatDuration(video.video_duration)}
            </span>
          </p>
          <p className="mt-2 flex items-center ml-5">
            <div
              className={`w-3 h-3 ${getStatusColor(video.status)} rounded-full`}
            />

            <span className="text-sm ml-1 text-black dark:text-white">
              {video.status}
            </span>
          </p>
        </div>
      </div>
        {video.status==="active"&&
      <div className="ml-auto mr-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDownload} viewBox="0 0 24 24" fill="currentColor" className="size-6 text-black dark:text-white">
            <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
          </svg>
         
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDeleteVideo} viewBox="0 0 24 24" fill="currentColor" className="size-6 text-black dark:text-white ml-2">
            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
          </svg>
          
          
      </div>
        }
    </div>
  );
};

export default VideoCard;
