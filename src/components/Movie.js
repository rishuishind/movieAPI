import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const handleDelete = id => {
    console.log(id);
    fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE'
    })
    props.onAdd();
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => handleDelete(props.id)}>Delete Movie</button>
    </li>
  );
};

export default Movie;
