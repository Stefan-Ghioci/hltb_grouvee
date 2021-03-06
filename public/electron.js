const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    minWidth: 1024,
    minHeight: 640,
    webPreferences: { webSecurity: false, contextIsolation: false, nodeIntegration: true },
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => (mainWindow = null));
}

app.commandLine.appendSwitch('disable-features', 'SameSiteByDefaultCookies');

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
