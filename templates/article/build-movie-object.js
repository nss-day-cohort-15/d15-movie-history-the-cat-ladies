"use strict";

function buildSimpleMovieObj(movie) {
    let events = require('../../src/js/events.js');
    let userID = events.getUserID();
    let simpleMovie = {
        title: movie.Title,
        year: movie.Year,
        posterURL: movie.Poster,
        uid: userID,
        imdbID: movie.imdbID
    }
    // console.log("constructed simple movie", simpleMovie)
    return simpleMovie
}

function buildComplexMovieObj(simpleMovieObj) {
    let events = require('../../src/js/events.js');
    let userID = events.getUserID();
    let complexMovie = {
        title: simpleMovieObj.Title,
        year: simpleMovieObj.Year,
        posterURL: simpleMovieObj.Poster,
        uid: userID,
        actors: simpleMovieObj.Actors,
        watched: false,
        rating: 0,
        imdbID: simpleMovieObj.imdbID
    }
    return complexMovie
}

module.exports = {buildComplexMovieObj, buildSimpleMovieObj}
