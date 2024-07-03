import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { saveAs } from 'file-saver';
export const getPresignedURL = async (formData: any) => {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/video/upload-start`,
      formData,
      { withCredentials: true }
    );
    if (result && result.status) {
      const resData = result.data;
      return { data: resData, error: null };
    } else {
      return {
        data: null,
        error: `Status is not success - code ${result.status}`,
      };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const uploadVideoToPresignedURL = async (
  url: string,
  video: any,
  fileType: string
) => {
  try {
    const result = await axios.put(url, video, {
      headers: {
        "Content-Type": fileType,
      },
    });
    if (result && result.status && result.statusText === "OK") {
      return "success";
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadOnSuccess = async (videoFileName: string) => {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/video/upload-success`,
      { videoFileName },
      { withCredentials: true }
    );
    if (result && result.status) {
      const resData = result.data;
      return { data: resData, error: null };
    } else {
      return {
        data: null,
        error: `Status is not success - code ${result.status}`,
      };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const fetchAllVideos = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/video/get-all`, {
      withCredentials: true,
    });
    if (result && result.status) {
      const resData = result.data;
      return { data: resData, error: null };
    } else {
      return {
        data: null,
        error: `Status is not success - code ${result.status}`,
      };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const pollVideosQueue = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/video/poll-queue`, {
      withCredentials: true,
    });
    if (result && result.status) {
      const resData = result.data;
      return { data: resData, error: null };
    } else {
      return {
        data: null,
        error: `Status is not success - code ${result.status}`,
      };
    }
  } catch (error) {
    return { data: null, error };
  }
};


export const retrieveTranscodeLogs = async (transcodeId:string)=>{
  try {
    const result = await axios.get(`${API_BASE_URL}/video/logs/${transcodeId}`, {
      withCredentials: true,
    });
    if (result && result.status) {
      const resData = result.data;
      return { data: resData, error: null };
    } else {
      return {
        data: null,
        error: `Status is not success - code ${result.status}`,
      };
    }
  } catch (error) {
    return { data: null, error };
  }
}


export const getMasterM3U8URL = async (transcodeId:string)=>{
  try {
    const result = await axios.get(`${API_BASE_URL}/video/masterURL/${transcodeId}`, {
      withCredentials: true,
    });
    if (result && result.status) {
      const resData = result.data;
      return { data: resData, error: null };
    } else {
      return {
        data: null,
        error: `Status is not success - code ${result.status}`,
      };
    }
  } catch (error) {
    return { data: null, error };
  }
}
export const downloadVideo = async (transcodeId:string,videoKey:string,setGlobalLoader:Function,showErrorFromServer:Function,setIsDownloadingVideo:Function)=>{
  setIsDownloadingVideo(true)
  setGlobalLoader(true)
  try {
     const response = await axios.post(`${API_BASE_URL}/video/download/${transcodeId}`,{videoKey},
      {
        responseType: 'blob', // important to handle the response as a binary data (blob)
        headers: {
          'Content-Type': 'application/json', // make sure to set this header
        },
        withCredentials: true,
      });
    
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/zip' });
      // Use file-saver to save the file
      saveAs(blob, `${videoKey.split('.').join('__')}.zip`);
      setIsDownloadingVideo(false)
      setGlobalLoader(false)
  } catch (error) {
    console.log("ERROR DOWNLOADING VIDEO",error);
    setIsDownloadingVideo(false)
    setGlobalLoader(false)
    showErrorFromServer(error)
  }
}


export const deleteVideo = async (transcodeId:string)=>{
  try {
     const result = await axios.delete(`${API_BASE_URL}/video/delete/${transcodeId}`,
      {
        withCredentials: true,
      });
    
      if (result && result.status) {
        const resData = result.data;
        return { data: resData, error: null };
      } else {
        return {
          data: null,
          error: `Status is not success - code ${result.status}`,
        };
      }
  } catch (error) {
    console.log("ERROR DELETING VIDEO",error);
    return { data: null, error };
  }
}