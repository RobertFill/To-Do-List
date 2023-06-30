const btnAdd = document.getElementById('btnAdd');
const list = document.getElementById('to-do-list');
let inputTxt = document.getElementById('input-text');
const content = document.querySelector('.content');
const removeAll = document.getElementById('remove-all')



let myListItems = []

btnAdd.addEventListener('click', buttonAdd)
removeAll.addEventListener('click', clean)

function buttonAdd() {
    //validation
    if (inputTxt.value === '') {
        alert('Digite algo na lista de tarefas');

        setError()

    } else if (inputTxt.value.length < 3) {

        minimunText()

    } else if (inputTxt.value.length > 29) {
        limitText()
    } else {

        myListItems.push({
            task: inputTxt.value,
            completed: false
        })
        removeError()

    }

    inputTxt.value = ''
    showLists()
}
function clean() {
    myListItems.splice([])

    showLists()
}

function setError() { // error ipunt empy
    inputTxt.style.border = "2px solid red";

    showLists()
}

function minimunText() {
    document.querySelector('span').style.display = "block" //input caracatere
    document.querySelector('#limit-Text').style.display = "none"
    inputTxt.style.border = "2px solid red"


}
function limitText() {
    inputTxt.style.border = "2px solid red"
    document.querySelector('#limit-Text').style.display = "block"
    document.querySelector('span').style.display = "none"

}


function removeError() { // input valid
    inputTxt.style.border = "none"
    document.querySelector('span').style.display = "none"

}

function showLists() {
    // lists affairs
    let newList = ''

    myListItems.forEach((item, position) => { //get array list ordenaten 
        newList += `
        <li class ="${item.completed && "done"}">
                    <p>${item.task}</p>
                    <div>
                        <button onclick="completeTask(${position})">
                            <img  src="./assets/check.svg" title="Confirmar" alt="checked">
                        </button>
                        <button onclick="deleteItem(${position})">
                            <img src="./assets/fechar.svg" title="Fechar" alt="close-task">
                        </button>
                    </div>
                </li> 
                `
    })

    list.innerHTML = newList
    localStorage.setItem('guardList', JSON.stringify(myListItems)) //convert to string
}
function completeTask(position) {
    myListItems[position].completed = !myListItems[position].completed; //inverted valor -!-


    showLists() //show complete on screan
}

function deleteItem(position) { //positio of item delete
    myListItems.splice(position, 1)


    showLists() //show delete on screan

}

function loadTaskScrean() {
    const localStorageTask = localStorage.getItem('guardList')
    if (localStorageTask) {
        myListItems = JSON.parse(localStorageTask) //return convertion
    }


    showLists()
}

loadTaskScrean()






