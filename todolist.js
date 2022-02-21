const personwewant = JSON.parse(localStorage.getItem("CurrentLoggedInPerson"));
let result = "todolist" in personwewant;
if (result == false) {
    alert("First Enter any todo item in profile page.... Thanks");
    window.location.href = "./profile.html";
}
// else
//   var arr = personwewant.todolist;


// window.addEventListener('DOMContentLoaded', () => {
//         const recentImageDataUrl = personwewant.pict;
//         console.log(recentImageDataUrl);
// })

// arr.sort((a, b) =>   Date(b.Date) - new Date(a.Date));

window.onload = loadTasks;                        // LOAD TASK

function loadTasks() {

    let tasks = personwewant.todolist;

    tasks.forEach(task => {
        const list = document.querySelector('#UID');
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" class="checks">
          <input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.Title}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <input type="text" value="${task.Category}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <input type="date" value="${task.Date}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash-o" onclick="removeTask(this)"></i>`;
        list.insertBefore(li, list.children[0]);
    });
}
//   EDIT TASK
var currentTask = null;
var currentCategory = null;
var currentDate = null;

function getCurrentTask(event) {
    currentTask = event.parentNode.children[2].value;
    currentCategory = event.parentNode.children[3].value;
    currentDate = event.parentNode.children[4].value;
}
function editTask(event) {
    let tasks = personwewant.todolist;
    var email = personwewant.Email;
    if (event.parentNode.children[2].value === "" || event.parentNode.children[3].value === "" || event.parentNode.children[4].value === "") {

        document.getElementById('ErrorID').innerHTML = "Please enter valid Values";
        event.parentNode.children[2].value = currentTask;
        event.parentNode.children[3].value = currentCategory;
        event.parentNode.children[4].value = currentDate;
        return;
    }

    tasks.forEach(task => {
        if (task.Title === event.parentNode.children[2].value && task.Category === event.parentNode.children[3].value && task.Date === event.parentNode.children[4].value) {
            alert("Task with the same completion date already exist!");
            event.parentNode.children[2].value = currentTask;
            event.parentNode.children[3].value = currentCategory;
            event.parentNode.children[4].value = currentDate;
            return;
        }
    });

    tasks.forEach(task => {
        if (task.Title === currentTask && task.Category === currentCategory && task.Date === currentDate) {
            task.Title = event.parentNode.children[2].value;
            task.Category = event.parentNode.children[3].value;
            task.Date = event.parentNode.children[4].value;
        }
    });
    personwewant.todolist = tasks;
    localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(personwewant));
    localStorage.setItem(email, JSON.stringify(personwewant));
}


function addTask() {                                              // add a new task
    const task = document.querySelector("#taskID");
    const ctask = document.querySelector("#categoryID");
    const dtask = document.querySelector("#dateID");
    const list = document.querySelector("#UID");
    // return if task is empty
    if (task.value === "" || dtask.value === "" || ctask.value == "") {
        document.getElementById('ediv').innerHTML = "*Please enter a task along with category and completion date*";
        return false;
    }
    else {
        document.getElementById('ediv').innerHTML = "";
    }
    // check is task already exist
    let tasks = personwewant.todolist;
    // task already exist
    tasks.forEach(todo => {
        if (todo.Title === task.value && todo.Date === dtask.value && todo.Category === ctask.value) {
            alert("Task already exist!");
            task.value = "";
            dtask.value = "";
            ctask.value = "";
            return;
        }
    });

    if (task.value === "" || dtask.value === "" || ctask.value === "") {
        return false;
    }
    // add task to local storage
    var finaltodo = personwewant.Email;
    const obj = { Title: task.value, Category: ctask.value, Date: dtask.value, Rdate: dtask.value, Ipublic: "true", IsComplete: "false" };

    let result = "todolist" in personwewant;


    if (result == false) {
        const arr = new Array();
        arr.push(obj);
        personwewant.todolist = arr;
    }
    else {
        const arr = personwewant.todolist;
        arr.push(obj);
        personwewant.todolist = arr;
    }


    localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(personwewant));
    localStorage.setItem(finaltodo, JSON.stringify(personwewant));

    // create list item, add innerHTML and append to ul
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="checks">
          <input type="checkbox" onclick="taskComplete(this)" class="check">
          <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <input type="text" value="${ctask.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <input type="date" value="${dtask.value}" class="task" onfocus="getCurrentDate(this)" onblur="editDate(this)">
          <i class="fa fa-trash-o" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    // clear input
    task.value = "";
    dtask.value = "";
    ctask.value = "Work";
}

function taskComplete(event) {                                         // mark the complete task
    let tasks = personwewant.todolist;
    var email = personwewant.Email;

    tasks.forEach(task => {
        if (task.Title === event.parentNode.children[2].value && task.Category === event.parentNode.children[3].value && task.Date === event.parentNode.children[4].value) {
            task.completed = !task.completed;
            task.IsComplete = "true";
        }
    });
    localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(personwewant));
    localStorage.setItem(email, JSON.stringify(personwewant));
    event.nextElementSibling.classList.toggle("completed");
    event.nextElementSibling.nextElementSibling.classList.toggle("completed");
    event.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle("completed");

}


function removeTask(event) {
    let arr = personwewant.todolist;
    var attr = "Title";
    var attr2 = "Category";
    var attr3 = "Date";
    var email = personwewant.Email;
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr) && arr[i].hasOwnProperty(attr2)
            && (event.parentNode.children[2].value === arr[i][attr] && event.parentNode.children[3].value === arr[i][attr2] && event.parentNode.children[4].value === arr[i][attr3])) {
            arr.splice(i, 1);
        }
    }
    personwewant.todolist = arr;
    localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(personwewant));
    localStorage.setItem(email, JSON.stringify(personwewant));
    event.parentElement.remove();
}

function removemultiTask() {

    const todoUL = document.getElementById('UID');
    const todos = todoUL.childNodes;
    //console.log(todos);
    var i = todos.length;
    //console.log(i);
    let arr = personwewant.todolist;
    var email = personwewant.Email;
    var attr = "Title";
    var attr2 = "Category";
    var attr3 = "Date";
    var index;
    while (i--) {
        if (todos[i].nodeName === "LI") {
            console.log(todos[i].children[0]);
            if (todos[i].children[0].checked) {
                var ind = arr.length;
                while (ind--) {
                    if (arr[ind]
                        && arr[ind].hasOwnProperty(attr) && arr[ind].hasOwnProperty(attr2) && arr[ind].hasOwnProperty(attr3) && (todos[i].children[2].value === arr[ind][attr] && todos[i].children[3].value === arr[ind][attr2] && todos[i].children[4].value === arr[ind][attr3])) {
                        arr.splice(ind, 1);
                        break;
                    }
                }
                todos[i].remove();
            }
        }
    }

    personwewant.todolist = arr;
    localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(personwewant));
    localStorage.setItem(email, JSON.stringify(personwewant));
}

function logout() {
    alert("Thanks for using our website");
    localStorage.removeItem("CurrentLoggedInPerson");
    window.location.href = "./register.html";
}



function filterlist() {
    var filter = document.getElementById("FilterID").value;
    console.log(filter);
    switch (filter) {
        case "date":
            toggledate();
            break;

        case "category":
            togglecategory();
            break;

        case "completed":
            checkallcompleteditem();
            break;

        case "uncompleted":
            checkalluncompleteditem();
            break;

        case "none":
            break;
    }
    var filter2 = document.getElementById("FilterID2").value;
    console.log(filter);
    switch (filter2) {
        case "date":
            toggledate();
            break;

        case "category":
            togglecategory();
            break;

        case "completed":
            checkallcompleteditem();
            break;

        case "uncompleted":
            checkalluncompleteditem();
            break;

        case "none":
            break;

    }
    var filter3 = document.getElementById("FilterID3").value;
    console.log(filter3);
    switch (filter3) {
        case "date":
            toggledate();
            break;

        case "category":
            togglecategory();
            break;

        case "completed":
            checkallcompleteditem();
            break;

        case "uncompleted":
            checkalluncompleteditem();
            break;

        case "none":
            break;
    }
    var filter4 = document.getElementById("FilterID4").value;
    console.log(filter4);
    switch (filter4) {
        case "date":
            toggledate();
            break;

        case "category":
            togglecategory();
            break;

        case "completed":
            checkallcompleteditem();
            break;

        case "uncompleted":
            checkalluncompleteditem();
            break;

        case "none":
            break;
    }
    return false;
}

function toggledate() {
    var myDiv = document.getElementById('dateDIV');
    var displaySetting = myDiv.style.display;

    if (displaySetting == 'block') {
        myDiv.style.display = 'none';
    }
    else {
        myDiv.style.display = 'block';
    }
}

function togglecategory() {
    var myDiv = document.getElementById('categoryDIV');
    var displaySetting = myDiv.style.display;

    if (displaySetting == 'block') {
        myDiv.style.display = 'none';
    }
    else {
        myDiv.style.display = 'block';
    }
}

function checkallcompleteditem() {
    const todoUL = document.getElementById('UID');
    const todos = todoUL.childNodes;
    console.log(todos);
    var i = todos.length;
    console.log(i);
    while (i--) {
        if (todos[i].nodeName === "LI") {
            if (todos[i].children[2].classList.contains("completed")) {
            }
            else {
                todos[i].style.display = "none";
            }
        }
    }
}

function checkalluncompleteditem() {
    const todoUL = document.getElementById('UID');
    const todos = todoUL.childNodes;
    console.log(todos);
    var i = todos.length;
    console.log(i);
    while (i--) {
        if (todos[i].nodeName === "LI") {
            if (todos[i].children[2].classList.contains("completed")) {
                todos[i].style.display = "none";
            }
        }
    }
}
function daterange() {
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    console.log(startDate);
    console.log(endDate);
    console.log(sDate);
    console.log(eDate);

    const todoUL = document.getElementById('UID');
    const todos = todoUL.childNodes;
    console.log(todos);
    var i = todos.length;
    console.log(i);
    while (i--) {
        if (todos[i].nodeName === "LI") {
            var date = new Date(todos[i].children[4].value);
            if (date < sDate || date > eDate) {
                todos[i].remove();
            }
        }
    }
    toggledate();
}
function categoryfun() {
    var categ = document.getElementById("categoryfID").value;
    if (categ == "none") {
        return false;
    }
    const todoUL = document.getElementById('UID');
    const todos = todoUL.childNodes;
    console.log(todos);
    var i = todos.length;
    console.log(i);
    while (i--) {
        if (todos[i].nodeName === "LI") {
            var c = todos[i].children[3].value;
            console.log(c);
            if (c !== categ) {
                todos[i].remove();
            }
        }
    }
    togglecategory();
}

function loggedIN() {
    alert("You are already registered and logged in .... First logout to register more or log in");
    return;
}