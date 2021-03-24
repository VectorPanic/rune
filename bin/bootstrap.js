const { app, BrowserWindow } = require('electron')

function createWindow () {
    let win = new BrowserWindow({
        width: 1152,
        height: 648,
        icon: __dirname + "/../asset/png/rune_app_icon.png",
        useContentSize: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: false
        }
    });

    win.setBackgroundColor("#000000");
    win.loadFile('./index.html');
    win.setFullScreen(true);
}

app.whenReady().then(createWindow)