const tasks = getTasks() || []

const tasksContainer = document.querySelector(".main-tasks")
const fixedTasksContainer = document.querySelector(".fixed-tasks")

const inputElement = document.querySelector("#input-add")
inputElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        addElement(inputElement.value, "", Date.now())
        inputElement.value = ""
    }
})

renderElements()

function setTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks"))
}

function addElement(taskLabel, taskDescription, id) {
    tasks.push({
        label: taskLabel,
        description: taskDescription,
        id,
        fixed: false,
        checked: false
    })

    setTasks()

    renderElements()
}

function renderElements() {

    tasksContainer.innerHTML = ''

    for (task in tasks) {
        console.log(`Rendering ${JSON.stringify(tasks[task])}`)
        createTaskElement(tasks[task].label, tasks[task].description, tasksContainer)
    }

}

function createTaskElement(taskLabel, taskDescription, tasksContainer) {
    const taskElement = document.createElement("div")
    taskElement.classList.add("task")

    const inputElement = document.createElement("input")
    inputElement.type = "checkbox"
    inputElement.name = taskLabel
    inputElement.id = Date.now()
    inputElement.classList.add("task-check")

    const taskTextsElement = document.createElement("div")
    taskTextsElement.classList.add("task-texts")

    const labelElement = document.createElement("label")
    labelElement.htmlFor = inputElement.id
    labelElement.classList.add("task-label")
    labelElement.setAttribute("data-content", taskLabel)
    labelElement.textContent = taskLabel

    const descriptionElement = document.createElement("label")
    descriptionElement.htmlFor = inputElement.id
    descriptionElement.classList.add("task-description")
    descriptionElement.textContent = taskDescription

    const iconElement = document.createElement("img")
    iconElement.src = "icons/more.svg"
    iconElement.classList.add("more-icon")
    iconElement.classList.add("svg")

    appendElement(labelElement, descriptionElement, inputElement, taskTextsElement, iconElement, taskElement, tasksContainer)

}

function appendElement(labelElement, descriptionElement, inputElement, taskTextsElement, iconElement, taskElement, tasksContainer) {
    taskTextsElement.append(labelElement)
    taskTextsElement.append(descriptionElement)

    taskElement.append(inputElement)
    taskElement.append(taskTextsElement)
    taskElement.append(iconElement)

    tasksContainer.append(taskElement)
}