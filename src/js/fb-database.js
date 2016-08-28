'use strict';

let firebase = require("./firebaseConfig"),
    url = 'https://cat-ladies-movie-history.firebaseio.com/';

function getMovies() {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}movies.json`
    }).done(function(movieData){
      resolve(movieData);
    });
  });
}

function addMovie(movieObj) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}movies.json`,
      type: 'POST',
      data: JSON.stringify(movieObj),
      dataType: 'json'
    }).done(function(movieID){
      resolve(movieID);
    });
  });
}

function deleteMovie(movieID) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}/movies/${movieID}.json`,
      type: 'DELETE'
    }).done((data)=> resolve(data));
  });
}

function editMovieRating(movieObj, movieID) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}/movies/${movieID}.json`,
      type: 'PUT',
      data: JSON.stringify(movieObj)
    }).done(function(data){
        resolve(data);
    });
  });
}

function showSavedMovies(userID) {
  return new Promise(function( resolve, reject) {
    $.ajax({
      url: `${url}movies.json?orderBy="uid"&equalTo"${userID}"`,
      type: 'GET'
    }).done(function(data) {
      console.log("inside showSavedMovies", data );
      resolve(data);
    });
  });
}


module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  editMovieRating,
  showSavedMovies
};
