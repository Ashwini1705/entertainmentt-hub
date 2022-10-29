import React, { useEffect } from 'react'
import axios from 'axios';
import Chip from '@mui/material/Chip';
const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
    const fetchGenres = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-us`);
        setGenres(data.genres);
    }

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter(g => g.id !== genre.id));
        setPage(1);
    }
    const handleDelete = (genre) => {
        setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    }
    // console.log(genres);
    useEffect(() => {
        fetchGenres();

        // return () => {
        //     setGenres({});
        // }
    }, [])
  return (
    <div style={{padding:"6px 0"}}>
        {selectedGenres && selectedGenres.map((genre) => {
            return (
                <Chip
                    label={genre.name}
                    style={{margin:2}}
                    clickable
                    key={genre.id}
                    color="primary"
                    onDelete={()=> handleDelete(genre)}
                />
            )
        })}
        {genres && genres.map((genre) => {
            return <Chip 
            label={genre.name} 
            style={{margin:2, backgroundColor:"white", color:"black"}} 
            clickable
            key={genre.id}
            onClick={()=> handleAdd(genre)}
            />
        })}
    </div>
  )
}

export default Genres