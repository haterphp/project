// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge, shell } from "electron"

contextBridge.exposeInMainWorld('electron', {
    windowClose: () => {
        ipcRenderer.send('window:close')
    },
    windowCollapse: () => {
        ipcRenderer.send('window:collapse')
    },
    windowMaximizeOrRestored: () => {
        ipcRenderer.send('window:maximize-or-restored')
    },
    updateIcon: (callback: () => void) => {
      ipcRenderer.on('window:state-var', callback)
    },
    openExternalLink: (link: string) => {
        shell.openExternal(link)
    }
})

export {}