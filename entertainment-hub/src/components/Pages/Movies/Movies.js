import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
import '../Trending/Trending.css';
import Genres from '../../Genres';
import useGenres from '../../Hooks/useGenres';
const Movies = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    fetchMovies();
    
  }, [page, selectedGenres])

  return (
    <>
    <div className='pageTitle'>Movies</div>
    <Genres 
          type="movie" 
          selectedGenres={selectedGenres} 
          setSelectedGenres={setSelectedGenres} 
          genres={genres} 
          setGenres={setGenres}
          setPage={setPage}
    />
      <div className='trending'>
        {content && content.map((item) =>
          <SingleContent key={item.id}
            id={item.id}
            poster={item.poster_path}
            title={item.title || item.name}
            date={item.release_date || item.first_air_date}
            media_type="movie"
            vote_average={item.vote_average}
          />
        )}
      </div>
      {numOfPages>1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages}/>)}
      {numOfPages===0 ? <h3>No Records Found</h3> : ""}
    </>
  )
}

export default Movies