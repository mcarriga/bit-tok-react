import { useState, useEffect } from "react";

import { createClient } from "pexels";

import BottomNav from "./components/BottomNav";
import VideoCard from "./components/VideoCard";

function App() {
  const [videos, setvideos] = useState([]);
  const [videosLoaded, setvideosLoaded] = useState(false);

  const randomQuery = () => {
    const queries = ["Funny", "Art", "Animals", "Coding", "Space"];
    return queries[Math.floor(Math.random() * queries.length)];
  };

  const getVideos = (length) => {
    console.log(`getVideos`);
    // Replace with your Pexels API Key
    const client = createClient("7KEyvE65u6Urfly99xD25cqIhuX2wyPcqRAoEbLGlUWsvdA7dgksGEwP");

    const query = randomQuery();
    client.videos
      .search({ query, per_page: length })
      .then((result) => {
        //console.log(`setVideos: old: ${oldVideos}`)
        console.log(`setVideos: new: ${result.videos}`)
        for (let vid of result.videos) {
          console.log(vid.id)
        }
        setvideos((oldVideos) => [...oldVideos, ...result.videos]);
        setvideosLoaded(true);
      })
      .catch((e) => setvideosLoaded(false));
  };

  useEffect(() => {
    getVideos(3);
  }, []);

  const logVideosLength = () => {
    console.log('Number of Videos: ' + videos.length)
  }

  const takeRight = (arr, n = 1) => n === 0 ? [] : arr.slice(-n);

  return (
    <main>
      <div className="slider-container">
        {videos.length > 0 ? (
          <>
            {
              logVideosLength()
            },
            {
            takeRight(videos, 3).map((video, id) => (
              <VideoCard
                key={id}
                index={id}
                author={video.user.name}
                videoURL={video.video_files[0].link}
                authorLink={video.user.url}
                lastVideoIndex={videos.length - 1}
                getVideos={getVideos}
              />
            ))}
          </>
        ) : (
          <>
            <h1>Nothing to show here</h1>
          </>
        )}
      </div>

      <BottomNav />
    </main>
  );
}

export default App;