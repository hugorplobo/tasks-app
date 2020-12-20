const menuItems = document.querySelectorAll(".header li")

menuItems.forEach(item => {
    item.addEventListener("click", event => {
        item.classList.toggle("active")
    })
})