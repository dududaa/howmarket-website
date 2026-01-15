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

const drawer = document.getElementById('drawer')
if(drawer){
    drawer.addEventListener('click', () => {
        drawer.style.display = 'none'
    })
}