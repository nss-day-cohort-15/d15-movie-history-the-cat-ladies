"use strict";

let complexMovieTemplate = require('../../templates/article/complexMovieTemplate.hbs');
let fb = require('./fb-database');

function outputToDomComplex(savedMovies) {
    let savedMoviesarr = [];

    $('#savedMovieOutput').html("");
    for (var i in savedMovies) {

      savedMoviesarr.push(savedMovies[i])
    }
    savedMoviesarr.forEach(function(savedMovie, i) {
        if (savedMovie.watched === false) {

          savedMovie.watched = "Your cats haven't seen this yet!"
        }

        else {
          savedMovie.watched = "Your cats have seen it." //in here we can disable hidden classes on rating and selectbox in complexMovieTemplate.hbs instead of placeholder text above
        }

        let savedMovieOutput = complexMovieTemplate(savedMovie);
        $('#savedMovieOutput').append(savedMovieOutput);




   })
     // $('.deleteButton').click(function(){

      let savedMoviesIDs = (Object.keys(savedMovies)) //need to target the specific key here and pass it into fb.deleteMovie function
      // console.log(savedMoviesIDs)

      savedMoviesIDs.forEach(function(savedMovieID){
        $('.deleteButton').click(function(){
        fb.deleteMovie(savedMovieID)
        console.log(savedMoviesIDs) //sort of working: deleting every movie from database instead of one

      })
   })

  }

module.exports = outputToDomComplex
