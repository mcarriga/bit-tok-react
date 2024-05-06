import { useState, useEffect } from "react";

import { createClient } from "pexels";

import BottomNav from "./components/BottomNav";
import DynamicVideoCard from "./components/DynamicVideoCard";

function App() {
  const [videoAssets, setVideoAssets] = useState([]);
  const [queuedVideos, setQueuedVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videoCards, setVideoCards] = useState([])
  const [order, setOrder] = useState([0, 1, 2, 3])


  const randomQuery = () => {
    const queries = ["Funny", "Art", "Animals", "Coding", "Space"];
    return queries[Math.floor(Math.random() * queries.length)];
  };

  const orderCards = (key) => {
    console.log(`orderCards.current: ${key}`);
    console.log(order);
    if (Math.abs(key - order[0]) == 2) {
        console.log('Should reorder from first to last');
        //setOrder((oldOrder) => oldOrder.push(oldOrder.shift()));
        setOrder((oldOrder) => {
            oldOrder.push(oldOrder.shift())
            console.log(`order should be ${oldOrder}`);    
            return [...oldOrder];
        });
    }
  }

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
        setVideoAssets((oldVideos) => [...oldVideos, ...result.videos]);
        setQueuedVideos((oldQueue) => result.videos.slice(0, 3));

        let cards = [
            {index: 0, card: <DynamicVideoCard key={0} index={0} author={result.videos[0].user.name} videoURL={result.videos[0].video_files[0].link} authorLink={result.videos[0].user.url} lastVideoIndex={result.videos.length - 1} orderCards={orderCards}/>},
            {index: 1, card: <DynamicVideoCard key={1} index={1} author={result.videos[1].user.name} videoURL={result.videos[1].video_files[1].link} authorLink={result.videos[1].user.url} lastVideoIndex={result.videos.length - 1} orderCards={orderCards}/>},
            {index: 2, card: <DynamicVideoCard key={2} index={2} author={result.videos[2].user.name} videoURL={result.videos[2].video_files[2].link} authorLink={result.videos[2].user.url} lastVideoIndex={result.videos.length - 1} orderCards={orderCards}/>},
            {index: 3, card: <DynamicVideoCard key={3} index={3} author={result.videos[3].user.name} videoURL={result.videos[3].video_files[3].link} authorLink={result.videos[3].user.url} lastVideoIndex={result.videos.length - 1} orderCards={orderCards}/>}
        ]
        setVideoCards((oldCards) => cards);

        setVideosLoaded(true);
      })
      .catch((e) => setVideosLoaded(false));
  };

  useEffect(() => {
    getVideos(12);
  }, []);

  useEffect(() => {
    if (videoCards) {
        console.log('videoCards true');
    } else {
        console.log('videoCards false');
    }
  }, [queuedVideos])

  const logVideosLength = () => {
    //console.log('Number of Videos: ' + queuedVideos.length)
    //console.log(queuedVideos)
    //console.log(videoAssets.slice(0, 3))
    //console.log(videoCards.length)
  }

  //{videoCards.find(card => card.index = order[0])}
  //{videoCards.find(card => card.index = order[1])}
  //{videoCards.find(card => card.index = order[2])}
  //{videoCards.find(card => card.index = order[3])}

  return (
    <main>
      <div className="slider-container">
        {videoCards.length > 0 ? (
          <>
            {
                logVideosLength()
            }
            {videoCards.find(card => card.index == order[0]).card}
            {videoCards.find(card => card.index == order[1]).card}
            {videoCards.find(card => card.index == order[2]).card}
            {videoCards.find(card => card.index == order[3]).card}
            
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