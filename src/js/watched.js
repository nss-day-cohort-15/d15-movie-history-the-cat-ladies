"use strict";
let fb = require('./fb-database')

function toggleWatched(watchedVal, movieID){
  //we are getting the watchedVal before it is changed
  let value = (watchedVal === 'Watched') ? {watched: false} : {watched: true}
  //add new value to db for movie
  fb.editMovie(value, movieID)
  .then(()=> Materialize.toast(`<h6>Movie was saved as ${value.watched? 'watched':'unwatched'}!</h6>`, 2000))
}

module.exports = toggleWatched
