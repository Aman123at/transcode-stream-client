import { FC } from "react";

const NoVideoSelected: FC = () => {
  return (
    <div className="bg-white dark:bg-black ml-auto">
      <div className="flex flex-col justify-center pt-10">
        <h1 className="text-5xl text-center font-thin text-black dark:text-white">
          No video selected
        </h1>
        <p className="text-center text-black dark:text-white mt-2">
          Please select any video from side panel to get preview
        </p>
        
      </div>
    </div>
  );
};

export default NoVideoSelected;
