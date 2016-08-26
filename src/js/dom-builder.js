"use strict";


let simpleMovieTemplate = require('../../templates/article/simpleMovieTemplate.hbs');
let complexMovieTemplate = require('../../templates/article/complexMovieTemplate.hbs');
let objectBuilders = require('../../templates/article/build-movie-object.js');

function outputToDomSimple(movieData) {
    $('#initialSearchOutput').html("");

    console.log("inside outputToDomSimple")
    console.log("movie data", movieData)
    movieData.Search.forEach(function(movie) {
      let simpleMovieObject = objectBuilders.buildSimpleMovieObj(movie);
      let output = simpleMovieTemplate(simpleMovieObject);
      $('#initialSearchOutput').append(output);
    })

    $('.saveButton').click(function(evt){
      var name = $(this).parent().parent().find('h3').html();
      var year = $(this).parent().parent().find('h4').html();
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




module.exports = outputToDomSimple;
