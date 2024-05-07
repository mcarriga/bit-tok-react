import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import DynamicVideoCard from "./components/DynamicVideoCard";
import { useRef, useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import {progressiveMp4s, hlsVideos} from '../src/sources';
import Circularray from './CircularArray';

const slideIndexes = new Circularray([0, 1, 2]);
const videosArray = new Circularray([...progressiveMp4s]);


function CarouselApp() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [previousSelectedIndex, setPreviousSelectedIndex] = useState(0);
    const [videos, setVideos] = useState([
        {cardIndex: slideIndexes.pointer.value, url: videosArray.pointer.value},
        {cardIndex: slideIndexes.pointer.next.value, url: videosArray.pointer.next.value},
        {cardIndex: slideIndexes.pointer.next.next.value, url: videosArray.pointer.next.next.value}
    ]);

    const onChange = (index, item) => {
        console.log(index);
        //console.log(item);
        if (index === slideIndexes.pointer.value) { // on current; do nothing

        } else if (index == slideIndexes.pointer.next.value) { // forward
            slideIndexes.rotate(-1);
            videosArray.rotate(-1);
            setVideos([
                {cardIndex: slideIndexes.pointer.value, url: videosArray.pointer.value},
                {cardIndex: slideIndexes.pointer.next.value, url: videosArray.pointer.next.value},
                {cardIndex: slideIndexes.pointer.prev.value, url: videosArray.pointer.prev.value}
            ])


        } else if (index == slideIndexes.pointer.prev.value) { // backward
            slideIndexes.rotate(1);
            videosArray.rotate(1);
            setVideos([
                {cardIndex: slideIndexes.pointer.value, url: videosArray.pointer.value},
                {cardIndex: slideIndexes.pointer.next.value, url: videosArray.pointer.next.value},
                {cardIndex: slideIndexes.pointer.prev.value, url: videosArray.pointer.prev.value}
            ])
        }
        setSelectedIndex(index);
    }

    useEffect(() => {
        console.log('hello');
    }, []);

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