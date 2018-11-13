
const { app, BrowserWindow } = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: false
  })
  mainWindow.loadURL('http://localhost:4000')
  mainWindow.once('ready-to-show', () => { mainWindow.show() })
  mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => { app.quit() })
app.on('activate', () => { if (mainWindow === null) createWindow() })