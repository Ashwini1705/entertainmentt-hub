import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { img_300, noPicture } from '../config/config';
import './Carousal.css';
const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
];

const Carousal = ({media_type, id}) => {
    const [credits, setCredits] = useState([]);

    const items = credits?.map((c) => (
        <div className='carousalItem'>
            <img src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} 
            alt={c?.name}
            onDragStart={handleDragStart}
            className='carousalItem_img'
            />
            <b className='carousalItem_name'>{c?.name}</b>
        </div>
    ))

    const responsive = {
        0:{
            items: 3
        },
        512: {
            items: 5
        },
        1024: {
            items: 7
        }
    }
    const fetchData = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        console.log(data);
        setCredits(data.cast);
    }
    useEffect(()=> {
        fetchData();
    },[])
  return (
    <AliceCarousel 
    mouseTracking
    infinite
    disableDotsControls
    disableButtonsControls
    responsive={responsive}
    items={items}
    autoPlay={true}
    fadeOutAnimation={true}
    mouseDragEnabled={true}
    playButtonEnabled={true}
    />
  );
}

export default Carousal;