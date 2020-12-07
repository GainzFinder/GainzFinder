var firebaseConfig = {
    apiKey: "AIzaSyD9yY3I8P5oBqNJQ-xz0VCmnbf-0jKvxYc",
    authDomain: "gainzfinder.firebaseapp.com",
    databaseURL: "https://gainzfinder.firebaseio.com",
    projectId: "gainzfinder",
    storageBucket: "gainzfinder.appspot.com",
    messagingSenderId: "273509946274",
    appId: "1:273509946274:web:284856d9531ec639ab98fb",
    measurementId: "G-64E1E3DSLQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");
    

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    
    alert("Signed Up");
}
function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    alert("Signed In!");
    promise.catch(e => alert(e.message));
}

function signOut(){

    auth.signOut();
    alert("Signed Out");

}

auth.onAuthStateChanged(function(user){

    if(user){

        var email = user.email;
        alert("Active User " + email);

    }


});