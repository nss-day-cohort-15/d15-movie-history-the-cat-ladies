"use strict";

let simpleMovieTemplate = require('../../templates/article/simpleMovieTemplate.hbs');
let complexMovieTemplate = require('../../templates/article/complexMovieTemplate.hbs');
let objectBuilders = require('../../templates/article/build-movie-object.js');
let fb = require('./fb-database');
let omdb = require('./omdb-api');

function outputToDomComplex(savedMovies) {
    let savedMoviesarr = [];
    $('#savedMovieOutput').html("");

    console.log("inside outputToDomComplex")
    console.log("savedMovies", savedMovies)
    for (var i in savedMovies) {
      savedMoviesarr.push(savedMovies[i])
    }
    savedMoviesarr.forEach(function(savedMovie) {
      let complexMovieObj = objectBuilders.buildComplexMovieObj(savedMovie);
      let savedMovieOutput = complexMovieTemplate(complexMovieObj);
      $('#savedMovieOutput').append(savedMovieOutput);
    })

}


module.exports = outputToDomComplex
