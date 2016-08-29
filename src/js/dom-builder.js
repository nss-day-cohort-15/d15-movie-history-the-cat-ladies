"use strict";

let simpleMovieTemplate = require('../../templates/article/simpleMovieTemplate.hbs')
let complexMovieTemplate = require('../../templates/article/complexMovieTemplate.hbs')
let objectBuilders = require('../../templates/article/build-movie-object.js')
let fb = require('./fb-database')
let omdb = require('./omdb-api')

let watched = require('./watched')
let moviesObj = {}
let userMovies = {}


function outputToDomSimple(movieData) {
    $('#initialSearchOutput').html("");

    console.log("inside outputToDomSimple")
    console.log("movie data", movieData)
    movieData.Search.forEach(function(movie) {
      let simpleMovieObject = objectBuilders.buildSimpleMovieObj(movie);
      let output = simpleMovieTemplate(simpleMovieObject);
      $('#initialSearchOutput').append(output);
    })

    $('.saveButton').click(function(){
      let clicked = this
      let movieObj = {
        title: $(clicked).parent().parent().find('h3').html(),
        year: $(clicked).parent().parent().find('h4').html()
      }
      //get movie from API
      omdb.getSingleMovie(movieObj)
        .then(function(movie){
          fb.addMovie(objectBuilders.buildComplexMovieObj(movie))
            .then(function(movie){
              $(clicked).html('SAVED').removeClass('btn-primary').addClass('btn-success').attr('disabled', 'disabled')
              Materialize.toast(`<h6>Movie was saved!</h6>`, 2000)
            })
        })
    })

}

//get movies that match the user and push to DOM
// function outputToDomComplex(){
//   let uid = require('./events').getUserID()

//   return new Promise(function(resolve, reject){
//     fb.getMovies(uid)
//     .then(function(movies){
//       loadMoviesUser(movies)
//       .then(function(userMovies){
//         setRating($('.rating'), userMovies)
//         $('.deleteButton').click(deleteButton)
//         $('.watched').click(toggleWatched)
//       })
//     })
//     resolve()
//   })
// }

//delete move from firebase and remove from DOM
function deleteButton(evt){
  let movieID = $(evt.target).parent().attr('id')

  fb.deleteMovie(movieID)
  .then(function(){
    Materialize.toast(`<h6>Movie was deleted!</h6>`, 2000)
    $(`#${movieID}`).parent().remove()
  })
}

function toggleWatched(evt){
  let watchedVal = $(evt.target).html()
  let movieID = $(evt.target).parent().attr('id')
  watched(watchedVal, movieID)

  $(evt.target).text(function(i, text){
    return text === "UnWatched" ? "Watched" : "UnWatched"
  }).toggleClass('btn-success').toggleClass('btn-default')
}

function loadMoviesUser(movies, userID){
  //reset userMovies to empy obj each time called
  userMovies = {}

  return new Promise(function(resolve, reject){
    let userID = require('./events').getUserID()
    let output
    let i = 0
    //build movies object for specific user
    for(var movie in movies){
      movies[movie].id = movie
      userMovies[`movie${i}`] = movies[movie]
      i++
    }
    output = complexMovieTemplate(movies)
    $('#initialSearchOutput').prepend(output)

    resolve(userMovies)
  })
}

module.exports = {outputToDomSimple, loadMoviesUser, deleteButton, toggleWatched}
