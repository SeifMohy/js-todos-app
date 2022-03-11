//selectors 

const input = document.querySelector("#todo-input");
const addButton = document.querySelector("#add");
const list = document.querySelector("#todo-list");

//event listeners 
document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", addTodo);
list.addEventListener("click", deleteCheck);


//functions 

function addTodo(e){
    e.preventDefault(); //so the page does not reload when submitting a  form

    const todoDiv = document.createElement("div"); //adding a div
    todoDiv.classList.add("todo"); //giving it a class of todo

    const todoList = document.createElement("li"); //creating a list
    todoList.classList.add("todoLi"); //adding a class to list
    todoList.innerText = input.value; //adding input value to the list
    todoDiv.appendChild(todoList); //adding it inside the div

    saveLocalTodos(input.value); //saving the todo to localStorage

    const comButton = document.createElement("button");
    comButton.innerText = "Complete"
    comButton.classList.add("com-btn");
    todoDiv.appendChild(comButton);

    const delButton = document.createElement("button");
    delButton.innerText = "Delete"
    delButton.classList.add("del-btn");
    todoDiv.appendChild(delButton);

    list.appendChild(todoDiv); //adding li to ul

    input.value = ""; //clearing input 

}

function deleteCheck(e){
    //console.log(e.target);
    const item = e.target;

    if (item.classList[0] === "del-btn"){
        const todo = item.parentElement 
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        //todo.remove();
        
    }

    if (item.classList[0] === "com-btn"){        
        const todo = item.previousElementSibling //I want to cross out the todo text only
        todo.classList.toggle("completed");

    }
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){ //checking if something is already saved 
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos")); //returns existing
    }
    todos.push(todo); //pushes new and existing to array
    localStorage.setItem("todos", JSON.stringify(todos)); //makes items strings?
}

function getTodos(){ //this takes the values from saved array and recreates them
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){ //for each item in todos creates the li
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo"); 

    const todoList = document.createElement("li"); 
    todoList.classList.add("todoLi"); 
    todoList.innerText = todo; //adding value from local storage
    todoDiv.appendChild(todoList); 

    const comButton = document.createElement("button");
    comButton.innerText = "Complete"
    comButton.classList.add("com-btn");
    todoDiv.appendChild(comButton);

    const delButton = document.createElement("button");
    delButton.innerText = "Delete"
    delButton.classList.add("del-btn");
    todoDiv.appendChild(delButton);

    list.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const indexOfText = todos.indexOf(todo.children[0].innerText);
    todos.splice(indexOfText, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
