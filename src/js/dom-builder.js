"use strict";

let simpleMovieTemplate = require('../../templates/article/simpleMovieTemplate.hbs');
let complexMovieTemplate = require('../../templates/article/complexMovieTemplate.hbs');
let objectBuilders = require('../../templates/article/build-movie-object.js');
let fb = require('./fb-database');
let omdb = require('./omdb-api');

function outputToDomSimple(movieData) { //called by events.js (search movies(userSearch))
    $('#initialSearchOutput').html(""); //clears DOM prior to filling it

    console.log("inside outputToDomSimple")
    console.log("movie data", movieData)
    movieData.Search.forEach(function(movie) { //for each movie in arr returned by OMDB
      let simpleMovieObject = objectBuilders.buildSimpleMovieObj(movie); //each movie passed into buildSimpleMovieObj function, which runs each movie through the simple movie template
      let output = simpleMovieTemplate(simpleMovieObject); //output defined as each templated movie
      $('#initialSearchOutput').append(output); //output appended to DOM
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


module.exports = outputToDomSimple;
