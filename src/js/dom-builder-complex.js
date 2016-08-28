"use strict";

let simpleMovieTemplate = require('../../templates/article/simpleMovieTemplate.hbs');
let complexMovieTemplate = require('../../templates/article/complexMovieTemplate.hbs');
let objectBuilders = require('../../templates/article/build-movie-object.js');
let fb = require('./fb-database');
let omdb = require('./omdb-api');

function outputToDomComplex(savedMovies) {
    let savedMoviesarr = [];
    $('#savedMovieOutput').html("");
    for (var i in savedMovies) {
      savedMoviesarr.push(savedMovies[i])
    }
    savedMoviesarr.forEach(function(savedMovie) {
      let savedMovieOutput = complexMovieTemplate(savedMovie);
      $('#savedMovieOutput').append(savedMovieOutput);
    })
}


module.exports = outputToDomComplex
