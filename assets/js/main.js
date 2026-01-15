// show drawer
const drawerTogglers = document.getElementsByClassName("drawerToggle")
for (let i = 0; i < drawerTogglers.length; i++) {
    const toggler = drawerTogglers.item(i)
    if (toggler) {
        toggler.addEventListener('click', () => {
            const drawer = document.getElementById('drawer')
            if (drawer) drawer.style.display = 'block'
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

        const name = getInputValue('user-name')
        const contact = getInputValue('user-contact')
        const reason = getInputValue('user-reason')
        const message = getInputValue('user-message')

        const data = { name, contact, reason, message }
        console.log(data)
        const { error } = await client
            .from('contact_messages')
            .insert([data]);

        if (error) {
            console.log(error)
        }
    })
}

const getInputValue = (inputId) => {
    return document.getElementById(inputId).value
}