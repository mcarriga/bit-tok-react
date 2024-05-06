import { useRef, useState, useEffect } from "react";

import useIsInViewport from "../useIsInViewport";

const VideoCard = ({
  index,
  author,
  videoURL,
  authorLink,
  lastVideoIndex,
  getVideos,
}) => {
  const video = useRef();
  const isInViewport = useIsInViewport(video);
  const [loadNewVidsAt, setloadNewVidsAt] = useState(lastVideoIndex);

  if (isInViewport) {
    console.log(`isInViewport true: current: ${video.current.id}`)
    setTimeout(() => {
      video.current.play();
    }, 1000);

    console.log(`loadNewVidsAt: ${loadNewVidsAt} ::: CurrentId ${Number(video.current.id)}`)
    if (loadNewVidsAt === Number(video.current.id)) {
        console.log(`loadNewVidsAt ${loadNewVidsAt}`);
      setloadNewVidsAt((prev) => prev + 2);
      getVideos(3);
    }
  } else {
    //console.log(`isInViewport false`)
  }

  const togglePlay = () => {
    console.log(`togglePlay`);
    let currentVideo = video.current;
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  useEffect(() => {
    if (!isInViewport) {
        //console.log(`isInViewport is false; calling pause()`)
      video.current.pause();
    }
  }, [isInViewport]);

  return (
    <div className="slider-children">
      <video
        muted
        className="video"
        ref={video}
        onClick={togglePlay}
        id={index}
        autoPlay={index === 1}
      >
        <source src={videoURL} type="video/mp4" />
      </video>
      <div className="video-content" onClick={togglePlay}>
        <p>@{author}</p>
        <p>
          Video by <a href={authorLink}>{author} </a> on Pexel
        </p>
      </div>
    </div>
  );
};

export default VideoCard;