const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.map(function (task) {
    if (typeof task === "string") {
        return {
            text: task,
            completed: false
        };
    }

    return task;
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
    const newTask = document.createElement("li");
    const taskText = document.createElement("span");

    taskText.textContent = task.text;

    if (task.completed) {
        newTask.classList.add("completed");
    }
    newTask.appendChild(taskText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    newTask.appendChild(deleteButton);

    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation();

        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        saveTasks();

        newTask.remove();
    });

    newTask.addEventListener("click", function () {
        newTask.classList.toggle("completed");

        task.completed = !task.completed;

        saveTasks();
    });

    taskList.appendChild(newTask);
}

tasks.forEach(function (task) {
    renderTask(task);
});

addButton.addEventListener("click", function () {

    if (taskInput.value.trim() === "") {
        return;
    }
    const task = {
        text: taskInput.value.trim(),
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTask(task);

    taskInput.value = "";

});
