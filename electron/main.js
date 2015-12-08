'use strict';
/*

 Main Application Files for Electron App

 */
console.log("Starting electron app from main.js");

var log = console.log;
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var electronConnectClient = require('electron-connect').client;

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  console.log("on ready!!!");
  console.log(process.argv.join(', '));

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  var url = 'file://' + __dirname + '/static/index.html';
  console.log("Loading electron app : " + url);
  mainWindow.loadURL(url);

  //mainWindow.openDevTools();

  // Connect the electron-connect client to server process
  electronConnectClient.create(mainWindow);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

});

app.on( 'gpu-process-crashed',           function(){ log( 'gpu-process-crashed'           ); } );
app.on( 'select-certificate',            function(){ log( 'select-certificate'            ); } );
app.on( 'activate-with-no-open-windows', function(){ log( 'activate-with-no-open-windows' ); } );
app.on( 'before-quit',                   function(){ log( 'before-quit'                   ); } );
app.on( 'browser-window-blur',           function(){ log( 'browser-window-blur'           ); } );
app.on( 'browser-window-focus',          function(){ log( 'browser-window-focus'          ); } );
app.on( 'open-file',                     function(){ log( 'open-file'                     ); } );
app.on( 'open-url',                      function(){ log( 'open-url'                      ); } );
app.on( 'quit',                          function(){ log( 'quit'                          ); } );
app.on( 'ready',                         function(){ log( 'ready'                         ); } );
app.on( 'will-finish-launching',         function(){ log( 'will-finish-launching'         ); } );
app.on( 'will-quit',                     function(){ log( 'will-quit'                     ); } );
app.on( 'window-all-closed',             function(){ log( 'window-all-closed'             ); } );
