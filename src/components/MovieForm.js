import React, { useRef } from "react";
import styles from "./MovieForm.module.css";
const MovieForm = (props) => {
  const movieTitleRef = useRef();
  const movieOpeningRef = useRef();
  const movieDateRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const movieTitle = movieTitleRef.current.value;
    const movieOpening = movieOpeningRef.current.value;
    const movieDate = movieDateRef.current.value;

    const NewMovieObj = {
      title: movieTitle,
      openingText: movieOpening,
      releaseDate: movieDate,
    };

    props.onAddMovie(NewMovieObj)
    // movieTitleRef.current.value = ' ';
    // movieOpeningRef.current.value = ' ';
    // movieDateRef.current.value = ' ';
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="movie">Title: </label>
        <input id="movie" type="text" ref={movieTitleRef}></input>
        <label htmlFor="opening">Opening text</label>
        <input id="opening" type="text" ref={movieOpeningRef}></input>
        <label htmlFor="date">Release Date</label>
        <input id="date" type="text" ref={movieDateRef}></input>
        <button className={styles.formBtn} type="submit">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
