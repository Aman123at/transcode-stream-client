export interface Video {
    _id?: string;
    transcode_id: string;
    owner: string;
    video_duration:number;
    video_file_name: string;
    created_at?: string;
    status:string;
    __v?: number;
  }

  export interface IVideoContext {
    videos: any;
    setVideos?: Function;
    selectedVideo:string;
    setSelectedVideo?: Function;
    fetchVideos?: () => void;
    selectedVideoKeyUrlDictionary:{
      [key:string]:string;
    };
    setSelectedVideoKeyUrlDictionary?: Function;
    // logoutUser?: () => void;
  }
  export interface IVideoProviderProps {
    children?: React.ReactNode;
  }