"use strict";

let api = `http://www.omdbapi.com/?`;

function searchMovies(searchTerm) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${api}type=movie&s=${searchTerm}`
    }).done(function(movies){
      console.log(movies)
      resolve(movies);
    });
  });
}

function getSingleMovie(movie) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${api}t=${movie.title}&y=${movie.year}`
    }).done(function(movie){
      resolve(movie);
    });
  });
}

module.exports = {searchMovies, getSingleMovie};
