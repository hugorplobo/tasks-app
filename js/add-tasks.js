let tasks = getTasks() || []

const tasksContainer = document.querySelector(".main-tasks")
const fixedTasksContainer = document.querySelector(".fixed-tasks")

const inputElement = document.querySelector("#input-add")
inputElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        addElement(inputElement.value, "", uuidv4())
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

    renderElements(id)
}

function renderElements() {

    tasksContainer.innerHTML = ''

    for (task in tasks) {
        console.log(`Rendering ${JSON.stringify(tasks[task])}`)
        createTaskElement(tasks[task].label, tasks[task].description, tasksContainer, tasks[task].id)
    }

}

function createTaskElement(taskLabel, taskDescription, tasksContainer, id) {
    const taskElement = document.createElement("div")
    taskElement.classList.add("task")

    const inputElement = document.createElement("input")
    inputElement.type = "checkbox"
    inputElement.name = taskLabel
    inputElement.id = id
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
    iconElement.src = "icons/more.png"
    iconElement.classList.add("more-icon")

    const menuElement = document.createElement("div")
    menuElement.classList.add("menu")

    const listPinElement = document.createElement("li")
    const listPinIcon = document.createElement("img")
    const listPinText = document.createTextNode("Pin")
    listPinIcon.src = "icons/pin-gray.png"
    listPinIcon.classList.add("icon")
    listPinElement.append(listPinText)
    listPinElement.append(listPinIcon)

    const listMemoElement = document.createElement("li")
    const listMemoIcon = document.createElement("img")
    const listMemoText = document.createTextNode("Add a memo")
    listMemoIcon.src = "icons/memo.png"
    listMemoIcon.classList.add("icon")
    listMemoElement.append(listMemoText)
    listMemoElement.append(listMemoIcon)

    const listTrashElement = document.createElement("li")
    const listTrashIcon = document.createElement("img")
    const listTrashText = document.createTextNode("Delete")
    listTrashIcon.src = "icons/trash.png"
    listTrashIcon.classList.add("icon")
    listTrashElement.append(listTrashText)
    listTrashElement.append(listTrashIcon)

    menuElement.append(listPinElement, listMemoElement, listTrashElement)

    iconElement.addEventListener("click", () => {
        menuElement.classList.toggle("active")
    })

    listTrashElement.addEventListener("click", () => {
        tasks = tasks.filter(item => item.id !== id)
        renderElements()
    })

    appendElement(labelElement, descriptionElement, inputElement, taskTextsElement, iconElement, menuElement, taskElement, tasksContainer)

}

function appendElement(labelElement, descriptionElement, inputElement, taskTextsElement, iconElement, menuElement, taskElement, tasksContainer) {
    taskTextsElement.append(labelElement)
    taskTextsElement.append(descriptionElement)

    taskElement.append(inputElement)
    taskElement.append(taskTextsElement)
    taskElement.append(iconElement)
    console.log(menuElement)
    taskElement.append(menuElement)

    tasksContainer.append(taskElement)
}