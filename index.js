'use strict'
const path = require('path')
const glob = require('glob')
const { app, BrowserWindow } = require('electron')

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// prevent window being garbage collected
let mainWindow

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null
}

// Following the main vs renderer processes convention
// https://github.com/electron/electron-api-demos/blob/master/docs.md
function loadMain() {
  let files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach((file) => {
    require(file)
  })
}

function createMainWindow() {
  loadMain()

  const win = new BrowserWindow({
    width: 600,
    height: 400
  })

  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
