import { FC } from "react";
import UploadVideoButton from "./UploadVideoButton";

const NoVideo: FC = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="flex flex-col justify-center pt-10">
        <h1 className="text-5xl text-center font-thin text-black dark:text-white">
          No videos to Transcode
        </h1>
        <p className="text-center text-black dark:text-white mt-2">
          Start Uploading Videos here
        </p>
        <UploadVideoButton />
        
      </div>
    </div>
  );
};

export default NoVideo;
