import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, createTheme, Tab, Tabs, ThemeProvider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})
const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearchData = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "movie" : "tv"}?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&language=en-US&page=${page}&include_adult=false`);
    setContent(data.results);
    console.log(data);
    setNumOfPages(data.total_pages);
  }
  useEffect(() => {
    window.scroll(0,0);
    fetchSearchData();
  },[page, type]);
  
  console.log("pages", numOfPages);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex" }}>
          <TextField id="filled-basic" 
          label="Search" 
          variant="filled" 
          style={{ flex: 1 }} 
          onChange={(e)=>setSearchText(e.target.value)}
          />
          <Button variant='contained' style={{ marginLeft: 10 }}
          onClick={fetchSearchData}><SearchIcon /></Button>
        </div>
        <Tabs value={type}
          indicatorColor="primary" 
          textColor='primary' 
          variant='fullWidth'
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{margin:"5px 0"}}
        >
          <Tab style={{ width: "50%" }} label="Search Movies"></Tab>
          <Tab style={{ width: "50%" }} label="Search TV Series"></Tab>
        </Tabs>
      </ThemeProvider>
      <div className='trending'>
            { content && content.map((item) => 
                <SingleContent key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.release_date || item.first_air_date}
                media_type = {type ? "tv" : "movie"}
                vote_average = {item.vote_average}
                />
            )}
        </div>
        {numOfPages > 1 && (
        <CustomPagination setPage={setPage}/>
        )}
    </div>
  )
}

export default Search;