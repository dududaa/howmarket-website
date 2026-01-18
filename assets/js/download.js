const download = () => {
    try {
        const link = document.createElement('a')
        link.href = 'https://github.com/dududaa/howmarket/releases/download/v1.0.0-alpha/HowMarket-v1.0.0-alpha.apk'
    
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    } catch (error) {
        showError(error.message)
    }
}

const showError = (message) => {
    downloadError.textContent = message
    downloadError.style.display = 'block'
}

const hideError = () => {
    downloadError.style.display = 'none'
}

const downloadIndicator = document.getElementById('countdownIndicator')
const downloadCountdown = document.getElementById('downloadCountdown')
const downloadBtn = document.getElementById("howmarket-download-btn")
const downloadError = document.getElementById('downloadError')

downloadBtn.addEventListener('click', () => {
    hideError()
    downloadIndicator.classList.add('show')
    let coundown = 5

    const intervalId = setInterval(() => {
        coundown--
        downloadCountdown.textContent = coundown
    }, 1000)

    setTimeout(() => {
        clearInterval(intervalId)
        download()
        downloadIndicator.classList.remove('show')
        downloadCountdown.textContent = 5
    }, 5000)

})
