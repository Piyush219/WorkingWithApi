import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setretryTimer] = useState();
  const [check, setCheck] = useState(false)


  


  const fetchMovieHandler = useCallback(async() => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something Went Wrong! ...Retrying");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      setCheck(true);
      
        
        const retry_Timer = setTimeout(() => {
          fetchMovieHandler();
        }, 5000);
      setretryTimer(retry_Timer)
      
      
    }
    setIsLoading(false);
  }, [])

  useEffect(()=>{
    fetchMovieHandler()
  },[fetchMovieHandler])
  

  const cancelRetryHandler = () => {
    
    clearTimeout(retryTimer)
    setCheck(false)
    
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {isLoading && <h1>Loading...</h1>}
      </section>
      <section>
        <MoviesList movies={movies} />
        {check && !isLoading && error && (
          <p>
            {error}{" "}
            <button onClick={cancelRetryHandler}>Cancel Retrying</button>
          </p>
        )}
        {!check && !isLoading && error && <p>Nothing to Show</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
