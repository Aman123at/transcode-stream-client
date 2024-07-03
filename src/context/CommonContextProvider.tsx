import { createContext, useContext, useState } from "react";
import {
  ICommonContext,
  ICommonProviderProps,
} from "../interfaces-ts/commoninterfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const CommonContext = createContext<ICommonContext | null>(null);
export const useCommonContext = () => {
  const state = useContext(CommonContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const CommonContextProvider: React.FC<ICommonProviderProps> = ({
  children,
}) => {
  const [globalLoader, setGlobalLoader] = useState<boolean>(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState<boolean>(false);
  const [isDownloadingVideo, setIsDownloadingVideo] = useState<boolean>(false);

  const showErrorFromServer = (error:any)=>{
    if(error.hasOwnProperty("response") && error.response.hasOwnProperty("data") && error.response.data.hasOwnProperty("message")){
        const msg = error.response.data.message
        showToast("error",msg);
      }
  }

  const showToast = (toastType: string, toastMsg: string) => {
    switch (toastType) {
      case "success":
        toast.success(toastMsg, {
          position: "top-center",
          closeOnClick: true,
        });
        break;
      case "error":
        toast.error(toastMsg, {
          position: "top-center",
          closeOnClick: true,
        });
        break;
      case "info":
        toast.info(toastMsg, {
          position: "top-center",
          closeOnClick: true,
        });
        break;

      default:
        break;
    }
  };

  return (
    <CommonContext.Provider
      value={{ globalLoader, setGlobalLoader, showToast, showErrorFromServer, setIsUploadingVideo, setIsDownloadingVideo }}
    >
      <ToastContainer autoClose={2000} />
      {globalLoader && <Loader isUploading={isUploadingVideo} isDownloading={isDownloadingVideo} />}
      {children}
    </CommonContext.Provider>
  );
};
