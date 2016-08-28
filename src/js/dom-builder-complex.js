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
          console.log('unwatched')
          savedMovie.watched = "Your cats haven't seen this yet!"
        }

        else {
          savedMovie.watched = "Your cats have seen it." //in here we can disable hidden classes on rating and selectbox in complexMovieTemplate.hbs instead of placeholder text above
        }

        let savedMovieOutput = complexMovieTemplate(savedMovie);
        $('#savedMovieOutput').append(savedMovieOutput);


     $('.deleteButton').click(function(){
      for (var key in savedMovies){
        let savedMovieID = i
        console.log(savedMovieID)
        fb.delete(savedMovieID)

      }
        fb.getMovies()
       .then(function (movieData){
          console.log(movieData)
        })
      })
   })

   }

module.exports = outputToDomComplex
