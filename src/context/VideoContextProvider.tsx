import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IVideoContext,
  IVideoProviderProps,
  Video,
} from "../interfaces-ts/videoInterfaces";
import { fetchAllVideos, pollVideosQueue } from "../api-calls/videoApis";
import { useCommonContext } from "./CommonContextProvider";
import { useAuthContext } from "./AuthContextProvider";

const VideoContext = createContext<IVideoContext | null>(null);
export const useVideoContext = () => {
  const state = useContext(VideoContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const VideoContextProvider: React.FC<IVideoProviderProps> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const [videos, setVideos] = useState<Video[]>([]);
  const { setGlobalLoader, showErrorFromServer } = useCommonContext();
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [selectedVideoKeyUrlDictionary, setSelectedVideoKeyUrlDictionary] =
    useState<{
      [key: string]: string;
    }>({});
  const pollForVideos = async () => {
    const { error } = await pollVideosQueue();
    if (error) {
      console.log("Error while fetching queue videos", error);
    }
  };

  const fetchVideos = useCallback(async () => {
    setGlobalLoader(true);
    const { data, error } = await fetchAllVideos();
    if (error) {
      console.log("Fetch Video Error", error);
      setGlobalLoader(false);
      showErrorFromServer(error);
    }
    if (data) {
      setVideos(data.videos);
      setGlobalLoader(false);
    }
  }, []);
  useEffect(() => {
    if (user) {
      fetchVideos();
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      pollForVideos();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        selectedVideo,
        setSelectedVideo,
        fetchVideos,
        selectedVideoKeyUrlDictionary,
        setSelectedVideoKeyUrlDictionary,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
