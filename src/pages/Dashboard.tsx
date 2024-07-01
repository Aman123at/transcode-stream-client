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

const Dashboard: FC = () => {
  const playerRef = useRef<Player | null>(null);
  const { user } = useAuthContext();
  const { videos, selectedVideo,fetchVideos } = useVideoContext();
  useEffect(()=>{
    if(videos.length===0){
      fetchVideos!();
    }
  },[])
  const [videoMasterURL,setVideoMasterURL] = useState("")
  const handlePlayerReady = (player:Player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
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
  

  return (
    <div className="bg-white dark:bg-black h-screen">
      <Header isUserLoggedIn />
      {videos && videos.length ? (
        <div className="flex">
          {(selectedVideo && videoMasterURL) ? (
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
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
