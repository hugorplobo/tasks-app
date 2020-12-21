const tasks = [
    {
        label: "Teste",
        description: "Só um teste",
        id: 1,
        fixed: false,
        checked: false
    },
    {
        label: "Teste Fixado",
        description: "",
        id: 0,
        fixed: true,
        checked: false
    }
]

const tasksContainer = document.querySelector(".main-tasks")
const fixedTasksContainer = document.querySelector(".fixed-tasks")

const inputElement = document.querySelector("#input-add")
inputElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        createTaskElement(inputElement.value, "", tasksContainer)
        inputElement.value = ""
    }
})

function renderElements() {
    inlineSVG.init({
        svgSelector: "img.svg"
    })
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
    iconElement.src = "../icons/more.svg"
    iconElement.classList.add("more-icon")
    iconElement.classList.add("svg")

    taskTextsElement.append(labelElement)
    taskTextsElement.append(descriptionElement)

    taskElement.append(inputElement)
    taskElement.append(taskTextsElement)
    taskElement.append(iconElement)

    tasksContainer.append(taskElement)

    tasks.push({
        label: taskLabel,
        description: taskDescription,
        id: inputElement.id,
        fixed: false,
        checked: false
    })

    renderElements()

}