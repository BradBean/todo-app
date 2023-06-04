let listNameInput = document.getElementById('listNameInput');
let addListButton = document.getElementById('addListButton');
let todoLists = document.getElementById('todoLists');
let message = document.getElementById('message');
let taskInputArea = document.getElementById('taskInputArea');
let taskNameInput = document.getElementById('taskNameInput');
let addTaskButton = document.getElementById('addTaskButton');
let tasks = document.getElementById('tasks');

let data = JSON.parse(localStorage.getItem('todoLists')) || {};

addListButton.addEventListener('click', function() {
    let listName = listNameInput.value.trim();
    if (listName === '') { 
      return; 
    }
    data[listName] = [];
    localStorage.setItem('todoLists', JSON.stringify(data));
    renderTodoLists();
    listNameInput.value = '';
  });

  function renderTodoLists() {
    todoLists.innerHTML = '';
    for (let listName in data) {
      let listItem = document.createElement('div');
      listItem.textContent = listName;
      listItem.classList.add('todoList');
  
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button'); 
      deleteButton.addEventListener('click', function() {
        delete data[listName];
        localStorage.setItem('todoLists', JSON.stringify(data));
        renderTodoLists();
      });
      listItem.appendChild(deleteButton);
  
      todoLists.appendChild(listItem);
      listItem.addEventListener('click', function() {
        currentList = listName;
        message.style.display = 'none';
        taskInputArea.style.display = 'block';
        renderTasks(listName);
      });
    }
  }
  

addTaskButton.addEventListener('click', function() {
  let newTask = taskNameInput.value;
  if (currentList && newTask) {
    data[currentList].push({ task: newTask, completed: false });
    localStorage.setItem('todoLists', JSON.stringify(data));
    renderTasks(currentList);
    taskNameInput.value = '';
  }
});

function renderTasks(listName) {
  tasks.innerHTML = '';
  let currentTasks = data[listName];
  for (let i = 0; i < currentTasks.length; i++) {
    let taskItem = document.createElement('div');
    taskItem.classList.add('task');

    let taskText = document.createElement('p');
    taskText.textContent = currentTasks[i].task;
    taskItem.appendChild(taskText);

    let completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete-button'); 
    completeButton.addEventListener('click', function() {
      currentTasks[i].completed = !currentTasks[i].completed;
      localStorage.setItem('todoLists', JSON.stringify(data));
      renderTasks(listName);
    });
    taskItem.appendChild(completeButton);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button'); 
    deleteButton.addEventListener('click', function() {
      data[listName].splice(i, 1);
      localStorage.setItem('todoLists', JSON.stringify(data));
      renderTasks(listName);
    });
    taskItem.appendChild(deleteButton);

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button'); // Add the class name
    editButton.addEventListener('click', function() {
      taskText.remove();
      completeButton.remove();
      deleteButton.remove();
      editButton.remove();

      let editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = currentTasks[i].task;
      taskItem.appendChild(editInput);

      let saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', function() {
        data[listName][i].task = editInput.value;
        localStorage.setItem('todoLists', JSON.stringify(data));
        renderTasks(listName);
      });
      taskItem.appendChild(saveButton);

      let cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.addEventListener('click', function() {
        renderTasks(listName);
      });
      taskItem.appendChild(cancelButton);
    });
    taskItem.appendChild(editButton);

    if (currentTasks[i].completed) {
      taskText.classList.add('completed');
    }

    tasks.appendChild(taskItem);
  }
}

renderTodoLists();
