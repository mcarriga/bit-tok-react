import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import DynamicVideoCard from "./components/DynamicVideoCard";
import { useRef, useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import {progressiveMp4s, hlsVideos} from '../src/sources'

const videoUrls = progressiveMp4s;

let lastLoadedVideoIndex = 2;
let needNewVideoAfterCard = 2;
let needPrevVideoBeforeCard = 1;


function CarouselApp() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [previousSelectedIndex, setPreviousSelectedIndex] = useState(0);

    const [videos, setVideos] = useState([{cardIndex: 0, url: videoUrls[0]}, {cardIndex: 1, url: videoUrls[1]}, {cardIndex: 2, url: videoUrls[2]}]);

    const getNextIndexInCardArray = (currIndex) => {
        let array = [0, 1, 2];

        if (currIndex === array.length - 1) {
            currIndex = 0;
        } else {
            currIndex++;
        }
        return currIndex;
    }

    const getNextVideoIndex = (currIndex) => {
        if (currIndex === videoUrls.length -1) {
            currIndex = 0;
        } else {
            currIndex++;
        }
        return currIndex;
    }

    const getPreviousIndexInCardArray = (currIndex) => {
        let array = [0, 1, 2];
        if (currIndex === 0) {
            currIndex = array.length -1;
        } else {
            currIndex--;
        }
        return currIndex;
    }

    const getPrevVideoIndex = (currIndex) => {
        if (currIndex === 0) {
            currIndex = videoUrls.length -1;
        } else {
            currIndex--;
        }
        return currIndex;
    }

    const maybeLoadNewVideo = () => {
        console.log(`maybeLoadNewVideo - selectedIndex: ${selectedIndex} :: previousSelectedIndex: ${previousSelectedIndex}`);
        if (selectedIndex > previousSelectedIndex || (previousSelectedIndex === 2 && selectedIndex === 0)) { //forward
            console.log(`selectedIndex > previousSelectedIndex - forward -- selected: ${selectedIndex} | needNewVideoAfterCard: ${needNewVideoAfterCard}`);
            if (selectedIndex === needNewVideoAfterCard) {
                let nextCardIndex = getNextIndexInCardArray(selectedIndex);
                let nextVideoIndex = getNextVideoIndex(lastLoadedVideoIndex);
                console.log(`nextCardIndex: ${nextCardIndex} :: needNewVideoAfterCard: ${needNewVideoAfterCard}`);

                needNewVideoAfterCard = nextCardIndex;
                lastLoadedVideoIndex = nextVideoIndex;
                console.log(`nextCardIndex: ${nextCardIndex} :: needNewVideoAfterCard: ${needNewVideoAfterCard}`);
                updateVideosForward();
            
            }
        } else { //backward
            console.log(`selectedIndex < previousSelectedIndex - backward - selected: ${selectedIndex} | needPrevVideoBeforeCard: ${needPrevVideoBeforeCard}`);
            if (selectedIndex === needPrevVideoBeforeCard) {
                let prevCardIndex = getPreviousIndexInCardArray(selectedIndex);
                let prevVideoindex = getPrevVideoIndex(lastLoadedVideoIndex -2);

                needPrevVideoBeforeCard = prevCardIndex;
                prevVideoindex--;
                console.log(`prevCardIndex: ${prevCardIndex} :: needNewVideoAfterCard: ${needPrevVideoBeforeCard}`);
                updateVideosBackwards();
            }
        }
    }

    const updateVideosBackwards = () => {
        let prevVideoAsset = videoUrls[lastLoadedVideoIndex -3];
        console.log(`useEffect for setVideos.Backward - ${needPrevVideoBeforeCard} :: ${prevVideoAsset}`);
        setVideos((oldVideos) => {
            let vids = [];
            for (let v of oldVideos) {
                if (v.cardIndex === needPrevVideoBeforeCard) {
                    vids.push({cardIndex: v.cardIndex, url: prevVideoAsset});
                } else {
                    vids.push(v);
                }
            }
            return vids;
        });
    }

    const updateVideosForward = () => {
        let nextVideoAsset = videoUrls[lastLoadedVideoIndex];
        console.log(`useEffect for setVideos.Forward - ${needNewVideoAfterCard} :: ${nextVideoAsset}`);
        setVideos((oldVideos) => {
            let vids = [];
            for (let v of oldVideos) {
                if (v.cardIndex === needNewVideoAfterCard) {
                    vids.push({cardIndex: v.cardIndex, url: nextVideoAsset});
                } else {
                    vids.push(v);
                }
            }
            return vids;
        });
      }

    const onChange = (index, item) => {
        console.log(`onChange`);
        console.log(index);
        console.log(item);
        setPreviousSelectedIndex(selectedIndex);
        setSelectedIndex(index);
    }

    useEffect(() => {
        if (selectedIndex != previousSelectedIndex) {
            console.log('selectedIndex changed - calling maybeLoadNewVideo');
             maybeLoadNewVideo();
        }
      }, [selectedIndex, previousSelectedIndex]);

    return (
        <main>
            <Carousel  infiniteLoop={true} axis={'vertical'} emulateTouch={true} showThumbs={false} showArrows={false} showIndicators={false} showStatus={false} onChange={onChange} dynamicHeight={false} useKeyboardArrows={true}>
                <DynamicVideoCard index={0}  videos={videos} selectedIndex={selectedIndex} />
                <DynamicVideoCard index={1}  videos={videos} selectedIndex={selectedIndex} />
                <DynamicVideoCard index={2}  videos={videos} selectedIndex={selectedIndex} />
            </Carousel>
        </main>
      );
}

export default CarouselApp;