// watch window scroll
const headers = document.querySelectorAll(".headerMobile, .appNavigation")
window.addEventListener('scroll', () => overlayHeaders())

const overlayHeaders = () => {
    const scrollY = window.scrollY
    for (let i = 0; i < headers.length; i++) {
        const item = headers.item(i)
        if (item) {
            if (scrollY >= 38) item.classList.add('scrolled')
            else item.classList.remove('scrolled')
        }
    }
}

overlayHeaders()

// show drawer
const drawerTogglers = document.getElementsByClassName("drawerToggle")
for (let i = 0; i < drawerTogglers.length; i++) {
    const toggler = drawerTogglers.item(i)
    if (toggler) {
        toggler.addEventListener('click', () => {
            const drawer = document.getElementById('drawer')
            if (drawer) {
                const scrollPos = window.scrollY;
                drawer.style.top = scrollPos + 'px'
                drawer.style.display = 'block'
            }
        })
    }
}

// hide drawer
const drawer = document.getElementById('drawer')
if (drawer) {
    drawer.addEventListener('click', () => {
        drawer.style.display = 'none'
    })
}

// submit form
const SUPABASE_URL = 'https://lwowlfiwudhwyssgkopy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vAezcaqeY6B9tZ-dgj-i2w_iyjtjZZd';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const form = document.getElementById('contact-form')
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        try {
            const name = getInputValue('user-name')
            const contact = getInputValue('user-contact')
            const reason = getInputValue('user-reason')
            const message = getInputValue('user-message')

            const data = { name, contact, reason, message }
            const { error } = await client
                .from('contact_messages')
                .insert([data]);

            if (error) throw new Error(error.message)
            else showToast('success', 'Message sent successfully!')

            form.reset()
        } catch (e) {
            showToast('error', e.message)
        }

    })
}

const getInputValue = (inputId) => {
    return document.getElementById(inputId).value
}


// toast
const hideToast = () => {
    const toast = document.getElementById("toast")
    toast.style.display = 'none'
}

const showToast = (type, msg) => {
    const scrollPos = window.scrollY;

    const toast = document.getElementById("toast")
    if (toast) {
        toast.classList.add(type)
        toast.style.top = (scrollPos + 18) + 'px'
        toast.style.display = 'block'

        const tax = document.getElementById("toastTextContent")
        if (tax) tax.innerText = msg

        setTimeout(hideToast, 5000)
    }
}

const hoastCancel = document.getElementById('toastClose')
hoastCancel.addEventListener('click', hideToast)