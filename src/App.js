import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieForm from "./components/MovieForm";

function App(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setretryTimer] = useState();
  const [check, setCheck] = useState(false)


  


  const fetchMovieHandler = useCallback(async() => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://react-http-7d042-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Something Went Wrong! ...Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }
      setMovies(loadedMovies);
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

  async function onAddMovieHandler(movie){
   const response = await fetch("https://react-http-7d042-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
  };

   const deleteMovieHandler = async(id) => {
     console.log({id})
    await fetch(`https://react-http-7d042-default-rtdb.firebaseio.com/movies/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(movies),
      headers: {
        'Content-Type' : 'application/json'
      }
    });
    fetchMovieHandler();
  }
  return (
    <React.Fragment >
      <section>
        <MovieForm onAddMovie = {onAddMovieHandler}/>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {isLoading && <h1>Loading...</h1>}
      </section>
      <section>
        <MoviesList movies={movies} deleteRequestApp = {deleteMovieHandler} />
        
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
