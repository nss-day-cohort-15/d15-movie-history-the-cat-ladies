"use strict";

let login = require('./user.js'),
    omdb = require('./omdb-api'),
    fb = require('./fb-database'),
    domBuilder = require('./dom-builder.js'),
    template = require('../../templates/article/moviedom.hbs'),
    userID = null,
    user = null

function setEvents () {
  addTemplate(user)
    $("#auth-button").click(function() {
        //login the user
        login()
        .then(function (result) {
          loginEvents(result)
        })
    });

    $("#findNew").click(function (){
        $('#initialSearchOutput').html('');
        $("#userInput").val('');
        $('#userInput').focus();
        addTemplate(user)
        addSearchEvent()
    })

    $("#savedMovies").click(function(){
      console.log('saved clicked')
      domBuilder.outputToDomComplex()
      .then(function(){
        $('.watched').click(function(){
          console.log('clicked!')
          let movieID = $(this).parent().attr('id')
          //fb.editMovie({watched: true}, movieID)
        })
      })
    })

    // Bread Crumb Buttons // Sorting Functions (LATER)

    $("#untracked-button").click(function () {
      $(".bread-target").html("Show Untracked")
    })

    $("#unwatched-button").click(function () {
      $(".bread-target").html("Show Unwatched")
    })

    $("#watched-button").click(function () {
      $(".bread-target").html("Show Watched")
    })

    $("#favorites-button").click(function () {
      $(".bread-target").html("Show Favorites")
    })
}

function getUserID () {
    return userID;
}

function addTemplate(user){
  $('#main-container').html(template(user))
}

function addSearchEvent(){
  //add search click
  $('#search-button').click(function () {
      //get search value
      let userSearch = $('#userInput').val()
      //find movies
      getUserMoviesSearch(userSearch)
      .then(function () {
      omdb.searchMovies(userSearch)
      .then(function (movies) {
        //add to dom
        console.log("movies inside the second promise", movies)
        domBuilder.outputToDomSimple(movies);
      })
    })
  })
}

function getUserMoviesSearch (userSearch) {
  return new Promise (function (resolve, reject) {
  console.log("inside getUserMoviesSearch")
  fb.getMovies(userID)
  .then(function (movieData) {
    let selectedUserMovies = []
    for (var movie in movieData) {
      console.log("user search in the FOR IN loop", userSearch)
      console.log("movieData in the FOR IN loop", movieData[movie].title)
      if (movieData[movie].title == userSearch) {
        selectedUserMovies.push(movieData[movie])
        console.log("selectedUserMovies", selectedUserMovies)
      }
    }
    domBuilder.loadMoviesUser(selectedUserMovies)
    })
  resolve()
  })
}

function loginEvents (result) {
  //set user and ID on global
  user = result.user
  userID = user.uid
  let loginToast = `<span><img class="login-img" src="${user.photoURL}"><h6>${user.displayName} successfully logged in!</h6></span>`
  Materialize.toast(loginToast, 2000)
  //update dom & add logout ID
  addTemplate(user)
  //add search click event
  addSearchEvent()
  $('#auth-button').unbind().attr('id','logout').html('LogOut')
  setEvents()
  console.log("user ID", user)
}
module.exports = {setEvents, getUserID}
