"use strict";

let login = require('./user.js');
let omdb = require('./omdb-api');
let domBuilder = require('./dom-builder.js');
let fb = require('./fb-database.js')

let userID = null;

function setEvents () {
    $("#auth-button").click(function() {
        console.log('auth running')
        login()
        .then(function (result) {
        console.log("current user", result.user)
        let user = result.user
        userID = user.uid
        $('#auth-button').unbind().attr('id','logout').html('LogOut')
        console.log("user ID", userID)
        $('#inputGroup').removeClass('hidden')
        })
    });

    $('#search-button').click(function () {
        console.log("Searching for movie")
        let userSearch = $('#userInput').val()
        omdb.searchMovies(userSearch)
        .then(function (movies) {
          domBuilder(movies);
        })
    })

    $("#findNew").click(function (){
        $('#initialSearchOutput').html('');
        $("#userInput").val('');
        $('#userInput').focus();
        console.log('findNew button clicked');
    })

    $('#searchMovie').click(function(){
           console.log('insidesearchmovie')
           console.log(userID)
           fb.showSavedMovies(userID);
        })
}

function getUserID () {
    return userID;
}

module.exports = {setEvents, getUserID}
