"use strict";

let simpleMovieTemplate = require('./simpleMovieTemplate.hbs');
let complexMovieTemplate = require('./complexMovieTemplate.hbs');


function buildSimpleMovieObj(movie) {
    let events = require('../../src/js/events.js')
    let userID = events.getUserID()
    let simpleMovie = {
        title: movie.Title,
        year: movie.Year,
        posterURL: movie.Poster,
        uid: userID
    }
    console.log("constructed simple movie", simpleMovie)
    return simpleMovie
}

function buildComplexMovieObj(simpleMovieObj) {
    let complexMovie = {
        title: simpleMovieObj.Title,
        year: simpleMovieObj.Year,
        posterURL: simpleMovieObj.Poster,
        uid: simpleMovieObj.userID,
        watched: false,
        rating: 0
    }
}