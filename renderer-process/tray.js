const {ipcRenderer} = require('electron')

// remember to import script in html
const container = document.getElementById('tray-text')

container.innerText = 'Just changed the tray text.'