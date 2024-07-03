import { FC, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import NoVideo from "../components/NoVideo";
import VideoCard from "../components/VideoCard";
import UploadVideoButton from "../components/UploadVideoButton";
import { useVideoContext } from "../context/VideoContextProvider";
import { Video } from "../interfaces-ts/videoInterfaces";
import NoVideoSelected from "../components/NoVideoSelected";
import VideoPlayer from "../components/VideoPlayer";
import { getMasterM3U8URL } from "../api-calls/videoApis";
import Player from "video.js/dist/types/player";
import { useCommonContext } from "../context/CommonContextProvider";

const Dashboard: FC = () => {
  const playerRef = useRef<Player | null>(null);
  const { user } = useAuthContext();
  const { videos, selectedVideo } = useVideoContext();
  const {showToast} = useCommonContext()
  const [videoMasterURL,setVideoMasterURL] = useState("")
  const handlePlayerReady = (player:Player) => {
    playerRef.current = player;
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };
  const setSelectedMasterURL=async()=>{
    const {data,error} = await getMasterM3U8URL(selectedVideo)
    if(error){
      console.log("Unable to get Master URL",error)
    }
    if(data){
      const {url} = data;
      setVideoMasterURL(url)
    }

  }
  useEffect(()=>{
    if(selectedVideo){
      setSelectedMasterURL()
    }
  },[selectedVideo])
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/auth");
    }
  }, [user]);
  const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    width: 1020,
    height: 500,
    controls: true,
    sources: [
      {
        src: videoMasterURL,
        type: 'application/x-mpegURL',
      },
    ],
  };

  const handleCopyMasterURL=async ()=>{
    navigator.clipboard.writeText(videoMasterURL)
    showToast("success","Copied Master M3U8 URL to clipboard")
  }
  

  return (
    <div className="bg-white dark:bg-black h-screen">
      <Header isUserLoggedIn />
      {videos && videos.length ? (
        <div className="flex">
          {(selectedVideo && videoMasterURL) ? (
            <div>
              <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
              <div className="mt-5 ml-8 flex items-center justify-center">
                <button className="btn btn-primary text-white" onClick={handleCopyMasterURL}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="size-6 mr-2">
                  <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
                  Copy Master M3U8 URL</button>
              </div>
            </div>
          ) : (
            <NoVideoSelected />
          )}

          <div className=" w-[400px] ml-auto mr-2">
            <UploadVideoButton isDashboardPage />
            <div className="overflow-y-scroll">
              {videos.map((video: Video) => (
                <VideoCard video={video} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NoVideo />
      )}
    </div>
  );
};

export default Dashboard;
