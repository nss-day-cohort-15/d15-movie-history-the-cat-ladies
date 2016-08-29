"use strict"

let events = require('./events.js')

$( document ).ready(function() {
    console.log("script.js is running")
    events.setEvents()
});
