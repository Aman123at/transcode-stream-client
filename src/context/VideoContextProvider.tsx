import {  createContext, useCallback, useContext, useEffect, useState } from "react";
import { IVideoContext, IVideoProviderProps, Video } from "../interfaces-ts/videoInterfaces";
import { fetchAllVideos, pollVideosQueue } from "../api-calls/videoApis";


const VideoContext = createContext<IVideoContext | null>(null)
export const useVideoContext = ()=>{
    const state = useContext(VideoContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
}


export const VideoContextProvider:React.FC<IVideoProviderProps> = ({children})=>{
    const [videos,setVideos]=useState<Video[]>([])
    const [selectedVideo,setSelectedVideo] = useState<string>("")
    const [selectedVideoKeyUrlDictionary,setSelectedVideoKeyUrlDictionary] = useState<{
        [key:string]:string;
      }>({})
    const pollForVideos = async()=>{
        const {data,error} = await pollVideosQueue()
        if(error){
            console.log("Error while fetching queue videos",error)
        }
        if(data){
            const {videos_count} = data;
            console.log(`${videos_count} videos found in queue.`)
        }
    }
    
    const fetchVideos=useCallback(
        async()=>{
            const {data,error} = await fetchAllVideos()
            if(error){
                console.log("Fetch Video Error",error)
            }
            if(data){
                setVideos(data.videos)
            }
        
    },[])
    useEffect(()=>{
        fetchVideos()
    },[])

    useEffect(()=>{
        const interval = setInterval(()=>{
            pollForVideos()
        },30000)
        return ()=>clearInterval(interval)
    },[])

    return (
        <VideoContext.Provider value={{videos,setVideos,selectedVideo,setSelectedVideo,fetchVideos,selectedVideoKeyUrlDictionary,setSelectedVideoKeyUrlDictionary}}>
            {children}
        </VideoContext.Provider>
    )
}