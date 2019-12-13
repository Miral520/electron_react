// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, screen} = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    minWidth: 500,
    minHeight: 350,
    center: true,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, './public/preload.js'),
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('./build/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 监听最小化
ipcMain.on('min', (e, arg) => {
  mainWindow.minimize();
});

// 监听全屏
ipcMain.on('fullscreen', (e, arg) => {
  let thisSize = mainWindow.getSize(); // 当前窗口尺寸
  let size = screen.getPrimaryDisplay().workAreaSize; // 窗口全屏尺寸
  if (thisSize[0] === size.width && thisSize[1] === size.height) {
      mainWindow.unmaximize();
  } 
  else {
      mainWindow.maximize();
  }
});

// 进入App
ipcMain.on('enter', (e, arg) => {
  mainWindow.setResizable(true);
  mainWindow.setSize(800, 600, true);
  mainWindow.center();
});