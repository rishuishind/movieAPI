import React, { useCallback, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';
import MovieAddForm from './components/AddMovie';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(false);

  const fetchMovies = useCallback(async () => {
    if (!cancel) {
      setIsLoading(true);
      try {
        const response = await fetch('https://react-http-96a9c-default-rtdb.firebaseio.com/movies.json');
        if (!response.ok) {
          throw new Error('something went wrong ...Retrying');
        }
        const data = await response.json();
        const loadedMovies = [];
        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate
          })
        }
        setMovies(loadedMovies);
      }
      catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies])

  const AddMovieHandler = async (movie) => {
    const response = await fetch('https://react-http-96a9c-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data.name);
  }

  return (
    <React.Fragment>
      <section>
        <MovieAddForm onAddMovie={AddMovieHandler} />
      </section>
      <section>
        <button onClick={() => { setCancel(false); fetchMovies() }}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !cancel && movies.length > 0 && <MoviesList onAdd={fetchMovies} movies={movies} />}
        {isLoading && !cancel && <p>Loading....</p>}
        {!isLoading && error && <p>{error}</p>}
        {cancel && <p>Fetching cancelled</p>}
        {!cancel && <button onClick={() => setCancel(true)}>Cancel Fetch</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
