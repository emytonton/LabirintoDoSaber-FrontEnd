const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('is-dev');

function createWindow() {
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

 
  const startURL = isDev
    ? 'http://localhost:3001'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  win.loadURL(startURL);

  if (isDev) {
    win.webContents.openDevTools();
  }
}


app.whenReady().then(createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});