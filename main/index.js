import { app, BrowserWindow, dialog } from 'electron';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: 'assets/512.png',
    webPreferences: {
        webSecurity: false, //risky, but it allows some extensions to be loaded
    }
  });

  mainWindow.loadFile('app/index.html');

  mainWindow.on('ready-to-show', () => {
    dialog.showMessageBox(mainWindow, {
        type: 'info',
        buttons: ['I see'],
        title: 'Warning',
        message: 'PenguinMod is not built for electron, so there might be some bugs that I cannot fix since it gets code directly from PenguinMod.',
    });
  })
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});