

function signup(){
    var email=document.getElementById("email")
    var password=document.getElementById("password")

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log("user==>" , user)
    // ...
  })
  .catch((error) => {

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error==>" ,errorMessage)
    console.log(errorCode)
    // ..
  });
    


    
}

function signin(){
    var email=document.getElementById("email")
    var password=document.getElementById("password")

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log("user==>" , user)
    // ...
  })
  .catch((error) => {

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error==>" ,errorMessage)
    console.log(errorCode)
    // ..
  });
    


    
}

