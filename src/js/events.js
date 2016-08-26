"use strict";

let login = require('./user.js')
let omdb = require('./omdb-api')

let userID = null;

function setEvents () {
    $("#auth-button").click(function() {
        console.log('auth running')
        login()
        .then(function (result) {
        console.log("current user", result.user)
        let user = result.user
        userID = user.uid
        console.log("user ID", userID)
          })
    });

    $('#search-button').click(function () {
        console.log("Searching for movie")
        let userSearch = $('#userInput').val()
        omdb.searchMovies(userSearch)
        // .then(loadMoviesToDom)
    })
}

function getUserID () {
    return userID;
}

module.exports = {setEvents, getUserID}