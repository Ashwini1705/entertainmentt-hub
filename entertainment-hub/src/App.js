
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Container } from '@mui/system';
import TvSeries from './components/Pages/TvSeries/TvSeries';
import Movies from './components/Pages/Movies/Movies';
import Trending from './components/Pages/Trending/Trending';
import Search from './components/Pages/Search/Search';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Container>
            <Routes>
              <Route exact path='/' element={<Trending />}></Route>
              <Route path='/movies' element={<Movies/>}></Route>
              <Route path='/tvseries' element={<TvSeries/>}></Route>
              <Route path='/search' element={<Search />}></Route>
            </Routes>
          </Container>
        </div>
        <SimpleBottomNavigation/>
      </BrowserRouter>
    </>
  );
}

export default App;
