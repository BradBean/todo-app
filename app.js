window.onload = function() {
    if(localStorage.getItem("allTasks")) {
        document.getElementById('taskLists').innerHTML = JSON.parse(localStorage.getItem("allTasks"));
    }
    if(localStorage.getItem("allLists")) {
        document.getElementById('listSelection').innerHTML = JSON.parse(localStorage.getItem("allLists"));
    }
}

document.getElementById('addListButton').addEventListener('click', function() {
    const listInput = document.getElementById('newListInput');
    const newList = listInput.value;
    listInput.value = '';

    const listDiv = createListElement(newList);

    listSelection.appendChild(listDiv);

    setDisplaySettings();

    const taskList = document.createElement('div');
    taskList.id = newList + '-tasks';
    taskList.style.display = 'none';

    document.getElementById('taskLists').appendChild(taskList);

    localStorage.setItem("allTasks", JSON.stringify(document.getElementById('taskLists').innerHTML));
    localStorage.setItem("allLists", JSON.stringify(document.getElementById('listSelection').innerHTML));
});

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('newTaskInput');
    const newTask = taskInput.value;
    taskInput.value = '';

    const selectedList = document.querySelector('.list-item.selected').id;
    const taskList = document.getElementById(selectedList + '-tasks');

    const taskItem = createTaskElement(newTask);

    taskList.appendChild(taskItem);

    localStorage.setItem("allTasks", JSON.stringify(document.getElementById('taskLists').innerHTML));
});

function createListElement(listId) {
    const listDiv = document.createElement('div');
    listDiv.textContent = listId;
    listDiv.id = listId;
    listDiv.className = 'list-item';
    listDiv.onclick = function() {
        switchList(listId);
    };
    return listDiv;
}

function createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const completeButton = createButton('Complete', 'btn-success', function() {
        taskText.style.textDecoration = 'line-through';
    });

    const removeButton = createButton('Remove', 'btn-danger', function() {
        taskItem.style.transition = "opacity 1s ease-out";
        taskItem.style.opacity = 0;
        setTimeout(function(){
            taskItem.remove();
            localStorage.setItem("allTasks", JSON.stringify(document.getElementById('taskLists').innerHTML));
        }, 1000);
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(removeButton);

    return taskItem;
}

function createButton(text, className, onclickFunction) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'btn ' + className;
    button.onclick = onclickFunction;
    return button;
}

function setDisplaySettings() {
    document.getElementById('taskInputSection').style.display = 'none';
    document.getElementById('selectListMessage').style.display = 'block';
    document.getElementById('createListMessage').style.display = 'none';
}

function switchList(listId) {
    const taskLists = document.getElementById('taskLists').children;
    const listItems = document.getElementById('listSelection').children;

    for(let i=0; i<taskLists.length; i++) {
        taskLists[i].style.display = 'none';
    }

    document.getElementById(listId + '-tasks').style.display = 'block';

    for(let i=0; i<listItems.length; i++) {
        if(listItems[i].id === listId) {
            listItems[i].classList.add('selected');
        } else {
            listItems[i].classList.remove('selected');
        }
    }

    document.getElementById('taskInputSection').style.display = 'block';
    document.getElementById('selectListMessage').style.display = 'none';
}
