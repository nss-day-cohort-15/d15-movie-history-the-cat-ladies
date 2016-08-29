"use strict";

let login = require('./user.js'),
    omdb = require('./omdb-api'),
    fb = require('./fb-database'),
    domBuilder = require('./dom-builder.js'),
    template = require('../../templates/article/moviedom.hbs'),
    setRating = require('./rating'),
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
    //   .then(function () {
    //   omdb.searchMovies(userSearch)
    //   .then(function (movies) {
    //     //add to dom
    //     console.log("movies inside the second promise", movies)
    //     domBuilder.outputToDomSimple(movies);
    //   })
    // })
  })
}

let userSavedMovies = {}
let searchResultMovies = {}

function getUserMoviesSearch(userSearch){
  return new Promise(function(resolve, reject){
    fb.getMovies(userID)
    .then(function(movieData){
      userSavedMovies = movieData
      searchResultMovies = omdb.searchMovies(userSearch)
    }).then(function(){
      //check and build object of movies
      domBuilder.loadMoviesUser(userSavedMovies)
      .then(function(userMovies){
        setRating($('.rating'), userMovies)
         $('.deleteButton').click(domBuilder.deleteButton)
         $('.watched').click(domBuilder.toggleWatched)
      })
    })
    resolve()
  })
}


//
// function getUserMoviesSearch (userSearch) {
//   return new Promise (function (resolve, reject) {
//   console.log("inside getUserMoviesSearch")
//   fb.getMovies(userID)
//   .then(function (movieData) {
//     let selectedUserMovies = []
//     for (var movie in movieData) {
//       if (movieData[movie].title == userSearch) {
//         movieData[movie].id = movie
//         console.log("movieData[movie].id", movieData[movie].id)
//         selectedUserMovies.push(movieData[movie])
//         console.log("selectedUserMovies", selectedUserMovies)
//       }
//     }
//     domBuilder.loadMoviesUser(selectedUserMovies)
//     .then(function(userMovies){
//       setRating($('.rating'), userMovies)
//       $('.deleteButton').click(domBuilder.deleteButton)
//       $('.watched').click(domBuilder.toggleWatched)
//     })
//     })
//   resolve()
//   })
// }

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
