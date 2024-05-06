import { useRef, useState, useEffect } from "react";

const DynamicVideoCard = ({
  index,
  selectedIndex,
  videos,
}) => {
  const video = useRef();
  const [videoURL, setVideoURL] = useState(videos.find(vid => vid.cardIndex === index));
  const [oldVideoUrl, setOldVideoUrl] = useState(videos.find(vid => vid.cardIndex === index));

  const togglePlay = () => {
    console.log(`togglePlay`);
    let currentVideo = video.current;
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  const pause = () => {
    video.current.pause();
  }

  
  useEffect(() => { // Rendered
    console.log(`I am created ${index} - ${videoURL}`)
  }, []);

  useEffect(() => { // New Slide Is selected
    if (selectedIndex === index) {
      console.log(`I am selected ${index}`)
      togglePlay();
    } else {
      pause();
    }
  }, [selectedIndex]);

  useEffect(() => { // Rendered
    let vid = videos.find(vid => vid.cardIndex === index);
    if (vid.url != videoURL.url) {
      setVideoURL(vid);
      console.log(`Card ${index} has new video url ${vid.url}`)
    }
  }, [videos]);

  useEffect(() => { // videoURL changed
    if (videoURL != oldVideoUrl) {
      console.log(`Card ${index} loading new video ${videoURL.url}`);
      video.current.load();
      setOldVideoUrl(videoURL);
    }
  }, [videoURL]);
  

  return (
    <div className="slider-children">
      <video
        muted
        className="video"
        ref={video}
        onClick={togglePlay}
        id={index}
      >
        <source src={videoURL.url} type="video/mp4" />
      </video>
    </div>
  );
};

export default DynamicVideoCard;