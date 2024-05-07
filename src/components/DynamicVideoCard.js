import { useRef, useState, useEffect } from "react";

const DynamicVideoCard = ({
  index,
  selectedIndex,
  videos,
}) => {
  const video = useRef();
  const [videoURL, setVideoURL] = useState(videos.find(vid => vid.cardIndex === index));
  const [oldVideoUrl, setOldVideoUrl] = useState(videos.find(vid => vid.cardIndex === index));

  const togglePlay = () => { // Toggles Play or Pause based on previos state
    console.log(`togglePlay`);
    let currentVideo = video.current;
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  const pause = () => { // Toggles Pause
    video.current.pause();
  }

  const play = () => {
    video.current.play();
  }

  
  useEffect(() => { // Rendered
    //console.log(`I am created ${index} - ${videoURL}`)
  }, []);

  useEffect(() => { // A New Slide Is selected
    if (selectedIndex == index) { // Newly selected slide is this slide
      console.log(`I am selected ${index}`)
      play();
    } else {
      pause();
    }
  }, [selectedIndex]);

  useEffect(() => { // handler for change in list of Videos passed to each slide
    let vid = videos.find(vid => vid.cardIndex === index);
    if (vid.url != videoURL.url) {
      setVideoURL(vid);
      console.log(`Card ${index} has new video url ${vid.url}`)
    }
  }, [videos]);

  useEffect(() => { // videoURL changed
    if (videoURL != oldVideoUrl) {
      // Note for PWX - New Video should be pre-loaded here
      console.log(`Card ${index} loading new video ${videoURL.url}`);
      video.current.load();
      setOldVideoUrl(videoURL);
    }
  }, [videoURL]);
  

  // Currently returns a basic html5 video element
  // TODO: swap out for PWX 
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