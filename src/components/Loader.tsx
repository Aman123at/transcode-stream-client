import  { FC } from 'react';

const Loader:FC<{isUploading?:boolean;isDownloading?:boolean;}> = ({isUploading,isDownloading}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid"></div>
      {isUploading && 
      <p className='text-xl text-white font-bold mt-2 ml-5'>Uploading Video, Please wait .....</p>
      }
      {isDownloading && 
      <p className='text-xl text-white font-bold mt-2 ml-5'>Downloading Video, Wait for a moment .....</p>
      }
    </div>
  );
};

export default Loader;