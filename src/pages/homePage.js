import React, {useState, useEffect } from "react";
import Header from "../components/headerMovieList";
import MovieList from "../components/movieList";
import FilterControls from "../components/filterControls";
import StubAPI from "../api/stubAPI";


const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return json.results
      })
      .then(movies => {
        setMovies(movies);
      });
  }, []);
  const addToFavorites = movieId => {
    // Find index position of selected movie in the list
    const index = movies.map(m => m.id).indexOf(movieId);

    StubAPI.add(movies[index]);
    const updatedList = [...movies] ; // Make a copy of the movie list
    updatedList.splice(index, 1);     // Remove selected movie from home page list
    setMovies(updatedList)  
  };

  return (
    <>
      <Header numMovies={displayedMovies.length} />
      <FilterControls onUserInput={handleChange} />
      <MovieList
        movies={displayedMovies}
        buttonHandler={addToFavorites}
      />     {/* CHANGED */}
    </>
  );
};

export default MovieListPage;