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

function editMovie(movieData, movieID) {
  console.log(movieData , '  ', movieID)
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `${url}/movies/${movieID}.json`,
      type: 'PATCH',
      data: movieData
    }).done(function(data){
        resolve(data);
    });
  });
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  editMovie
};
