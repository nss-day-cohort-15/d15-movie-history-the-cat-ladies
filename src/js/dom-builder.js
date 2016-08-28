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

// function outputToDomComplex(movie) {

//     let complexMovieObject = buildComplexMovieObj(movie);
//     let output = complexMovieTemplate(complexMovieObject);
//     $('#initialSearchOutput').append(output)
// }
// }

// function (movieObj) {
//   $('#initialSearchOutput').append()
// }

//THINGS TO TRY: OUTPUT COMPLEX MOVIE TO DOM WITH STRAIGHT DB/NON FILTERED CALL, HERE WRITE OUTPUTTODOMCOMPLEXMOVIE


module.exports = outputToDomSimple;
