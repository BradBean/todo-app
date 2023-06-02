document.getElementById('addListButton').addEventListener('click', function() {
    const listInput = document.getElementById('newListInput');
    const newList = listInput.value;
    listInput.value = '';

    const listSelection = document.getElementById('listSelection');

    const listDiv = document.createElement('div');
    listDiv.textContent = newList;
    listDiv.id = newList;
    listDiv.className = 'list-item';
    listDiv.onclick = function() {
        switchList(newList);
    };

    listSelection.appendChild(listDiv);

    document.getElementById('taskInputSection').style.display = 'none';
    document.getElementById('selectListMessage').style.display = 'block';
    document.getElementById('createListMessage').style.display = 'none';

    const taskList = document.createElement('div');
    taskList.id = newList + '-tasks';
    taskList.style.display = 'none';

    document.getElementById('taskLists').appendChild(taskList);
});

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('newTaskInput');
    const newTask = taskInput.value;
    taskInput.value = '';

    const selectedList = document.querySelector('.list-item.selected').id;
    const taskList = document.getElementById(selectedList + '-tasks');

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const taskText = document.createElement('span');
    taskText.textContent = newTask;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'btn btn-success complete-btn';
    completeButton.onclick = function() {
        taskText.style.textDecoration = 'line-through';
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'btn btn-danger remove-btn';
    removeButton.onclick = function() {
        taskItem.remove();
    };

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(removeButton);

    taskList.appendChild(taskItem);
});

function switchList(listId) {
    const taskLists = document.getElementById('taskLists').children;
    for(let i=0; i<taskLists.length; i++) {
        taskLists[i].style.display = 'none';
    }

    document.getElementById(listId + '-tasks').style.display = 'block';

    const listItems = document.getElementById('listSelection').children;
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
