const weekDay = document.querySelector(".today")
const dateElement = document.querySelector(".today-description")
const date = new Date()

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

weekDay.innerHTML = weekDays[date.getDay()]
dateElement.innerHTML = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
