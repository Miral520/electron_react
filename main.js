// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, screen} = require('electron');
const path = require('path');
const os = require('os');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let startWindow; // 欢迎页窗口
let mainWindow; // 主程序窗口

// 创建窗口
function createWindow () {
  // Create the browser window.
  startWindow = new BrowserWindow({
    width: 310,
    height: 345,
    minWidth: 310,
    minHeight: 345,
    center: true,
    transparent: true,
    frame: false,
    resizable: false,
    hasShadow: true,
    show: true,
    alwaysOnTop: true,
    // movable: true,
    webPreferences: {
      preload: path.join(__dirname, './public/preload.js'),
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 350,
    center: true,
    transparent: true,
    frame: false,
    resizable: true,
    hasShadow: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, './public/preload.js'),
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  // and load the index.html of the app.
  startWindow.loadURL(`file://${__dirname}/build/index.html?start=0`);
  mainWindow.loadURL(`file://${__dirname}/build/index.html?start=1`);

  // Open the DevTools.
  // startWindow.webContents.openDevTools();
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  startWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    startWindow = null
  });
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// 进入程序主窗口
function enterMainWindow () {
  startWindow.destroy();
  mainWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // 创建窗口
  createWindow();

  // 传递操作系统信息
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('sys', os.type())
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
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
  enterMainWindow();
});