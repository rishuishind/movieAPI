import React, { useCallback, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(false);

  const fetchMovies = useCallback(async () => {
    if (!cancel) {
      setIsLoading(true);
      try {
        const response = await fetch('https://swapi.dev/api/films');
        if (!response.ok) {
          throw new Error('something went wrong ...Retrying');
        }
        const data = await response.json();
        const newdata = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        })
        setMovies(newdata);
      }
      catch (error) {
        setError(error.message);
        if (!cancel) {
          setTimeout(() => {
            fetchMovies();
          }, 5000)
        }
      }

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !cancel && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && !cancel && <p>Loading....</p>}
        {!isLoading && error && <p>{error}</p>}
        {cancel && <p>Fetching cancelled</p>}
        <button onClick={() => setCancel(true)}>Cancel Fetch</button>
      </section>
    </React.Fragment>
  );
}

export default App;
