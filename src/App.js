import search from './search.svg';
import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

//d3658f37
const API_ULR = "http://www.omdbapi.com/?i=tt3896198&apikey=d3658f37"


function App() {

  const [movies, setMovies] = useState([])
  const [searchText, setSearchText] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_ULR}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('superman');
  },[])



  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className='search'>
        <input type="text" 
          placeholder='Search for movies'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? searchMovies(searchText) : '')}
        />
        <img src={search} alt="search" onClick={() => searchMovies(searchText)}/>
      </div>
          {
            movies?.length > 0 ? (
              <div className="container">
                { movies.map((movie) => (
                    <MovieCard movie={movie} />
                  ))
                }
              </div>

            ) : (
              <div className="empty">
                <h3>There're no movies</h3>
              </div>
            )
          }
    </div>
  );
}

export default App;
