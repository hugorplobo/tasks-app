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

    renderElements()
}

function renderElements() {

    tasksContainer.innerHTML = ''
    fixedTasksContainer.innerHTML = ''

    for (task in tasks) {
        console.log(`Rendering ${JSON.stringify(tasks[task])}`)
        if (tasks[task].fixed) {
            createTaskElement(tasks[task], fixedTasksContainer)
        } else {
            createTaskElement(tasks[task], tasksContainer)
        }
        
    }

    setTasks()

}

function createTaskElement(taskItem, tasksContainer) {

    // taskLabel, taskDescription, tasksContainer, id

    const taskElement = document.createElement("div")

    for (task in tasks) {
        if (tasks[task].id === taskItem.id && tasks[task].fixed) {
            taskElement.classList.add("task", "fixed-task")
        }
        else {
            taskElement.classList.add("task")
        }
    }

    const inputElement = document.createElement("input")
    inputElement.type = "checkbox"
    inputElement.name = taskItem.label
    inputElement.id = taskItem.id
    inputElement.classList.add("task-check")

    if (taskItem.checked) {
        inputElement.checked = true
    }

    const pinElement = document.createElement("img")
    pinElement.src = "icons/pin.png"
    pinElement.classList.add("pin-icon")

    const taskTextsElement = document.createElement("div")
    taskTextsElement.classList.add("task-texts")

    const labelElement = document.createElement("label")
    labelElement.htmlFor = inputElement.id
    labelElement.classList.add("task-label")
    labelElement.setAttribute("data-content", taskItem.label)
    labelElement.textContent = taskItem.label

    const descriptionElement = document.createElement("label")
    descriptionElement.htmlFor = inputElement.id
    descriptionElement.classList.add("task-description")
    descriptionElement.textContent = taskItem.description

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
        tasks = tasks.filter(item => {
            return item.id != taskItem.id
        })
        menuElement.classList.toggle("active")
        renderElements()
    })

    listPinElement.addEventListener("click", () => {
        tasks = tasks.map((task) => {
            if (task.id === inputElement.id) {
                taskElement.classList.toggle("fixed-task")
                menuElement.classList.toggle("active")
                task.fixed = !task.fixed
                renderElements()
            }

            return task
        })
    })

    inputElement.addEventListener("change", () => {
        tasks = tasks.map((task) => {
            if (task.id === inputElement.id) {
                task.checked = !task.checked
                console.log(task)
                setTasks()
            }
            
            return task
        })
    })

    for (task in tasks) {
        if (tasks[task].id === taskItem.id && tasks[task].fixed) {
            appendElement(labelElement, descriptionElement, inputElement, taskTextsElement, iconElement, menuElement, taskElement, tasksContainer, pinElement)
            return
        }
    }
    
    appendElement(labelElement, descriptionElement, inputElement, taskTextsElement, iconElement, menuElement, taskElement, tasksContainer)

}

function appendElement(labelElement, descriptionElement, inputElement, taskTextsElement, iconElement, menuElement, taskElement, tasksContainer, pinIcon=false) {
    taskTextsElement.append(labelElement)
    taskTextsElement.append(descriptionElement)

    taskElement.append(inputElement)

    if (pinIcon) {
        taskElement.append(pinIcon)
    }

    taskElement.append(taskTextsElement)
    taskElement.append(iconElement)
    console.log(menuElement)
    taskElement.append(menuElement)

    tasksContainer.append(taskElement)
}