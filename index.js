var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var size = electron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width : 80,
    height : 80,
    alwaysOnTop : true,
    frame : false,
    resizable : true,
    x : size.width - 95,
    y : size.height - 95
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
