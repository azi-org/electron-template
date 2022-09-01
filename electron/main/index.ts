import { app, BrowserWindow, shell } from 'electron'
import path from 'path'
import { release } from 'os'

// Disable GPU Acceleration for Windows7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

export const ROOT_PATH = {
  dist: path.join(__dirname, '../../../dist'),
  public: path.join(
    __dirname,
    app.isPackaged ? '../../../dist' : '../../../public'
  ),
}

export let win: BrowserWindow | null = null
const url = 'http://localhost:3000'
const indexHtml = path.join(ROOT_PATH.dist, 'index.html')

const preload = path.join(__dirname, '../preload/index.js')

const createWindow = () => {
  win = new BrowserWindow({
    icon: path.join(ROOT_PATH.public, 'favicon.ico'),
    width: 1200,
    height: 800,
    // frame: false,
    // fullscreenable: true,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染过程是否使用Node API
      preload,
    },
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    win.webContents.openDevTools()
  }

  // Make all links open in browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return {
      action: 'deny',
    }
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})
