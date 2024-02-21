import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push ,onValue, remove} from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings ={
    databaseURL:"https://realtime-database-b2d01-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
})
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
            let itemsArray = Object.entries(snapshot.val())
            shoppingList.innerHTML=""
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            unorderList(itemsArray[i])
        }
    }
    else{
        shoppingList.innerHTML = "No items here... yet"
    }
})
function clearShoppingListEl() {
    shoppingList.innerHTML = ""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function unorderList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {
        
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    shoppingList.append(newEl)
}