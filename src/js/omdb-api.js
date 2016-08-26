'use strict';

let api = `http://www.omdbapi.com/?`;

function searchMovies(searchTerm) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}s=${searchTerm}`
    }).done(function(movies){
      resolve(movies);
    });
  });
}

function getSingleMovie(movie) {
  return new Promise(function){
    $.ajax({
      url: `${url}t=${movie.title}&y=${movie.year}`
    }).done(function(movie){
      resolve(movie);
    });
  });
}

module.exports = {searchMovies, getSingleMovie};
