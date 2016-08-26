"use strict";


let simpleMovieTemplate = require('.simpleMovieTemplate.hbs');
let complexMovieTemplate = require('.complexMovieTemplate.hbs');

function outputToDomSimple(movieData) {
    movieData.forEach(function(movie) {
    let simpleMovieObject = buildSimpleMovieObj(movie);
    let output = simpleMovieTemplate(simpleMovieObject);
    $('#initialSearchOutput').append(output);
})
];
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
