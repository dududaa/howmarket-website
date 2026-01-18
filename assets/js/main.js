let LOADING = false

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

                document.body.style.overflowY = 'hidden'
            }
        })
    }
}

// hide drawer
const drawer = document.getElementById('drawer')
if (drawer) {
    drawer.addEventListener('click', () => {
        drawer.style.display = 'none'
        document.body.style.overflowY = 'auto'
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
        if(LOADING) return
        LOADING = true

        const btn = document.getElementById('contact-submit-btn')
        btn.disabled = true

        const btnTextContent = btn.textContent
        btn.textContent = 'loading...'

        console.log(btnTextContent)

        try {
            const name = getInputValue('user-name')
            const contact = getInputValue('user-contact')
            const reason = getInputValue('user-reason')
            const message = getInputValue('user-message')

            if (name.length < 1 || contact.length < 1 || reason == 'Reason' || message.length < 1) throw new Error('All fields are required!')

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

        btn.textContent = btnTextContent
        LOADING = false
        btn.disabled = false
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

        const toastText = document.getElementById("toastTextContent")
        if (toastText) toastText.innerText = msg

        setTimeout(hideToast, 5000)
    }
}

const hoastCancel = document.getElementById('toastClose')
hoastCancel.addEventListener('click', hideToast)
