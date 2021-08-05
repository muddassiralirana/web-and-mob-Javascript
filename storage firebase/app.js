
var itemInput = document.getElementById("itemInput");
var db = firebase.firestore();
var addBtn = document.getElementById("addBtn");



let register = () => {
    let itemObj = {
        item : itemInput.value
    }
    // console.log(itemObj)
    db.collection("items").add(itemObj)
    .then((savedItem) => {
        console.log(savedItem,"data add");
        
    })


}









function fetchAllLists() {
    db.collection("items")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {

                    // console.log("add list: ", change);
                    let itemObj = change.doc.data();
                    itemObj.id = change.doc.id;
                    showItemsInDOM(itemObj)
                }
                if (change.type === "removed") {
                    console.log("Removed list: ", change.doc.id);
                    removeListFromDOM(change.doc.id);
                }
                if (change.type === "modified") {
                    console.log("modified list: ", change.doc.id);
                    let tasksObj = change.doc.data();
                    tasksObj.id = change.doc.id;
                    updateItemsFromDOM(tasksObj);
                }

            });
        });  
}



let oderList = document.getElementById("oderList");

let showItemsInDOM = (items) => {
    let list = document.createElement("li");
    let listText = document.createTextNode(items.item);
    list.setAttribute("id", items.id)
    let editBtn = document.createElement("button");
    let editBtnText = document.createTextNode("Edit");
    editBtn.setAttribute("onClick", "editItem(this)");
    editBtn.appendChild(editBtnText);
    list.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    let deleteBtnText = document.createTextNode("Delete");
    deleteBtn.setAttribute("onClick", "deleteItem(this)");
    deleteBtn.appendChild(deleteBtnText);
    list.appendChild(deleteBtn);

    list.appendChild(listText);
    oderList.appendChild(list);
    itemInput.value = "";

}



let deleteItem = (deleteBtn) => {
    let itemId = deleteBtn.parentNode;
    console.log(itemId.id);
    db.collection("items").doc(itemId.id).delete()    
}


let removeListFromDOM = (id) => {
    let targetToRemove = document.getElementById(id);
    oderList.removeChild(targetToRemove);
}




var editId;
let editItem = (editBtn) => {
    let editId = editBtn.parentNode.id; 
    let itemValue = editBtn.parentNode.lastChild.nodeValue;
    console.log(itemValue);
    console.log(editId);

    itemInput.value = itemValue;
    addBtn.innerHTML = "save";
    addBtn.setAttribute("onClick", "updateEditItem(this)");


}



function updateEditItem(editedItem){
console.log(editedItem); // id missing
db.collection("items").doc(editId).update({ item : itemInput.value})
.then(() => {console.log("its work")})
.catch(() => {console.log(editId)});

addBtn.setAttribute("onClick", "register()");
addBtn.innerHTML = "Add";
editId = undefined;
itemInput.value = "";
}


let updateItemsFromDOM = (updateObject) => {
   let updateObjId = document.getElementById(updateObject.id)
   console.log(updateObjId);
   console.log(updateObject);
}



























// storage\\\\\\

let storage = firebase.storage();
let fileEle = document.getElementById("dp");




let uploadImage = () => {
    let file = fileEle.files[0];
    let displayPicRef = storage.ref().child("images/" + file.name);

    displayPicRef.put(file)
    .then(() => {
        displayPicRef.getDownloadURL()
        .then((url) => {
            console.log(url)
        })
    })
}