document.getElementById('addListButton').addEventListener('click', function() {
    const listInput = document.getElementById('newListInput');
    const newList = listInput.value;
    listInput.value = '';

    const listSelection = document.getElementById('listDropdown');

    const listOption = document.createElement('option');
    listOption.textContent = newList;
    listOption.value = newList;

    listSelection.appendChild(listOption);

    document.getElementById('taskInputSection').style.display = 'block';
    document.getElementById('createListMessage').style.display = 'none';

    const taskList = document.createElement('div');
    taskList.id = newList;
    taskList.style.display = 'none';

    document.getElementById('taskLists').appendChild(taskList);
});

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('newTaskInput');
    const newTask = taskInput.value;
    taskInput.value = '';

    const selectedList = document.getElementById('listDropdown').value;
    const taskList = document.getElementById(selectedList);

    const taskItem = document.createElement('div');
    taskItem.textContent = newTask;
    taskItem.className = 'task-item'; 

    taskList.appendChild(taskItem);
});
