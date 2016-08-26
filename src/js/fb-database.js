'use strict';

let firebase = require("./firebaseConfig"),
    url = 'https://cat-ladies-movie-history.firebaseio.com/';

function getMovies() {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}movies.json`
    }).done(function(songData){
      resolve(songData);
    });
  });
}

function addMovie(songFormObj) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}movies.json`,
      type: 'POST',
      data: JSON.stringify(songFormObj),
      dataType: 'json'
    }).done(function(songId){
      resolve(songId);
    });
  });
}

function deleteMovie(movieId) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}/movies/${movieId}.json`,
      type: 'DELETE'
    }).done((data)=> resolve(data));
  });
}

function editMovieRating(movieFormObj, movieId) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}/songs/${movieId}.json`,
      type: 'PUT',
      data: JSON.stringify(movieFormObj)
    }).done(function(data){
        resolve(data);
    });
  });
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  editMovieRating
};
