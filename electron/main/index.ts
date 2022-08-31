import { app, BrowserWindow } from 'electron'
import path from 'path'

export const ROOT_PATH = {
  dist: path.join(__dirname, '../..'),
  public: path.join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

const preload = path.join(__dirname, '../preload/index.js')

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染过程是否使用Node API
      preload,
    },
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'))
  } else {
    const url = 'http://localhost:3000'
    win.loadURL(url)
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
