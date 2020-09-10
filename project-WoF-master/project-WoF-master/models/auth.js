import {setScreen} from "../index.js"

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        setScreen('lobby');
    }
    else {
        
        setScreen("login");

    }
});

