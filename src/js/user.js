"use strict";
let firebase = require("./firebaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider()

function logInGoogle() {
    console.log("Auth Running")
    return firebase.auth().signInWithPopup(provider)
}

module.exports = logInGoogle;
