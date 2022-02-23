//import styles from './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState, useEffect} from 'react'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const[searchValue, setSearchValue] = useState('star wars');



  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=22291b84074a8a7ddb5b1547378f77e7&language=en-US&query=${searchValue}&page=1&include_adult=false`;

    const response = await fetch(url);
    const jsonResponse = await response.json();

    console.log(jsonResponse);
    if(jsonResponse.results){
    setMovies(jsonResponse.results)
    };
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    if(movieFavs){
      setFavourites(movieFavs);
    }
  },[]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }

  const addFavMovie = (movie) => {
      //const newFavMovies = [...favourites, movie];
      const exists = favourites.some(e => e.id === movie.id);
      console.log(exists)
      if(!exists){
          const newFavMovies = [...favourites, movie];
          setFavourites(newFavMovies);
          saveToLocalStorage(newFavMovies)
      }
      else{
        alert("this is already a favorite")
      }
  };

  const removeFavorite = (movie) => {
    const newFavMovies = favourites.filter(
      (favorite) => favorite.id !== movie.id
    );
    setFavourites(newFavMovies);
    saveToLocalStorage(newFavMovies);
  };

  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
          movies={movies}
          key={movies.id}
          handleFavClick={addFavMovie}
          favComponent={AddFavourites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites"/>
      </div>
      <div className='row'>
        <MovieList 
          movies={favourites}
          handleFavClick={removeFavorite}
          favComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
