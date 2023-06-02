document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('newTaskInput');
    const newTask = taskInput.value;
    taskInput.value = '';

    const taskList = document.getElementById('taskLists');

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const taskName = document.createElement('span');
    taskName.textContent = newTask;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
});
