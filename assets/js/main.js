// show drawe
const drawerTogglers = document.getElementsByClassName("drawerToggle")
for (let i = 0; i < drawerTogglers.length; i++) {
    const toggler = drawerTogglers.item(i)
    if (toggler) {
        toggler.addEventListener('click', () => {
            const drawer = document.getElementById('drawer')
            if(drawer) drawer.style.display = 'block'
        })
    }
}

// hide drawer
const drawer = document.getElementById('drawer')
if(drawer){
    drawer.addEventListener('click', () => {
        drawer.style.display = 'none'
    })
}

// submit form
const form = document.getElementById('contact-form')
if(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = getInputValue('user-name')
        const contact = getInputValue('user-contact')
        const reason = getInputValue('user-reason')
        const message = getInputValue('user-message')

        const data = { name, contact, reason, message }
        console.log(data)
    })
}

const getInputValue = (inputId) => {
    return document.getElementById(inputId).value
}