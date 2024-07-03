export interface ICommonProviderProps {
    children?: React.ReactNode;
  }


  export interface ICommonContext {
    globalLoader: any;
    setGlobalLoader: Function;
    setIsUploadingVideo: Function;
    setIsDownloadingVideo: Function;
    showToast: (toastType:string,toastMsg:string) => void;
    showErrorFromServer: (error:any) => void;
    // logoutUser?: () => void;
  }