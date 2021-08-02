function saveData() {
    var name = document.getElementById("name");
    var roll = document.getElementById("roll");

    var student = {
        name: name.value,
        roll: roll.value,
        
    }

    firebase.firestore().collection('student').add(student)
    // console.log(student)
}
