"use strict";

function setRating(el, moviesObj){
  let fb = require('./fb-database')

  // max rating, i.e. number of stars you want
  let maxRating = 5;
  // callback to run after setting the rating
  let saveRatingFB = function(ratingID){
    //this will only work in Chrome until I can figure out a way to get the evt param passed in
    let movieID = $(event.target).parent().next().attr('id')
    let newRating = {rating : ratingID}
    fb.editMovie(newRating, movieID)
    .then(() => console.log('rating saved'))
  }

  Array.from(el).forEach((e, i) => {
    let currentRating = moviesObj[`movie${i}`].rating
    //sets up rating for each movie saved
    rating(e, currentRating, maxRating, saveRatingFB)
  })
  // let myRating = rating(el, currentRating, maxRating, saveRatingFB)
}

module.exports = setRating
