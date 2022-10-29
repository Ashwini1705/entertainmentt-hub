import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../Pagination/CustomPagination';
const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        // console.log(data);
        setContent(data.results);
    }
    useEffect(() => {
        fetchTrending();
        
    },[page])
    return (
        <>
        <div className='pageTitle'>Trending</div>
        <div className='trending'>
            { content && content.map((item) => 
                <SingleContent key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.release_date || item.first_air_date}
                media_type = {item.media_type}
                vote_average = {item.vote_average}
                />
            )}
        </div>
        <CustomPagination setPage={setPage}/>
        </>
    )
}

export default Trending