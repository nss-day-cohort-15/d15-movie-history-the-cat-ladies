"use strict";

let simpleMovieTemplate = require('../../templates/article/simpleMovieTemplate.hbs');
let complexMovieTemplate = require('../../templates/article/complexMovieTemplate.hbs');
let objectBuilders = require('../../templates/article/build-movie-object.js');
let fb = require('./fb-database');
let omdb = require('./omdb-api');

function outputToDomSimple(movieData) {
    $('#initialSearchOutput').html("");

    console.log("inside outputToDomSimple")
    console.log("movie data", movieData)
    movieData.Search.forEach(function(movie) {
      let simpleMovieObject = objectBuilders.buildSimpleMovieObj(movie);
      let output = simpleMovieTemplate(simpleMovieObject);
      $('#initialSearchOutput').append(output);
    })

    $('.saveButton').click(function(){
      let clicked = this;
      let movieObj = {
        title: $(clicked).parent().parent().find('h3').html(),
        year: $(clicked).parent().parent().find('h4').html()
      }
      //get movie from API
      omdb.getSingleMovie(movieObj)
        .then(function(movie){
          fb.addMovie(objectBuilders.buildComplexMovieObj(movie))
            .then(function(movie){
              console.log('movie saved: ' , movie);
              $(clicked).html('SAVED').removeClass('btn-primary').addClass('btn-success').attr('disabled', 'disabled');
            });
        });
    });

}

function outputToDomComplex(){
  let userID = require('./events').getUserID();
  $('#initialSearchOutput').html('')

  fb.getMovies()
    .then(function(movies){
      let output
      console.log(movies)
      for(var movie in movies){
        if(movies[movie].uid === userID){
          output = complexMovieTemplate(movies[movie])
          $('#initialSearchOutput').append(output)
        }
      }
    })
}

module.exports = {outputToDomSimple, outputToDomComplex};
