import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';

const VideoPlayer: React.FC<any> = (props:any) => {
    const videoRef = React.useRef<any>(null);
    const playerRef = React.useRef<Player | null>(null);
    const {options, onReady} = props;

    useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
          // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
          const videoElement = document.createElement("video-js");
    
          videoElement.classList.add('vjs-big-play-centered');
          videoRef.current.appendChild(videoElement);
    
          const player = playerRef.current = videojs(videoElement, options, () => {
            videojs.log('player is ready');
            onReady && onReady(player);
          });
    
        // You could update an existing player in the `else` block here
        // on prop change, for example:
        } else {
          const player = playerRef.current;
    
          player.autoplay(options.autoplay);
          player.src(options.sources);
        }
      }, [options, videoRef]);
      useEffect(() => {
        const player = playerRef.current;
    
        return () => {
          if (player && !player.isDisposed()) {
            player.dispose();
            playerRef.current = null;
          }
        };
      }, [playerRef]);
    

  return (
    <div className='ml-2' data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
