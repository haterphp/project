import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MenuIcon, WindowIcons } from './icons'
import './index.css'

type ToolbarState = 'minimize' | 'maximize-or-restored' | 'close'

interface IToolbarProps {
    onNavbarControl: Dispatch<SetStateAction<boolean>>
}

const Toolbar = (props: IToolbarProps) => {

    const [isRestoredIcon, setIsRestoredIcon] = useState(false)

    useEffect(() => {
        (window as any).electron.updateIcon((_: any, state: string) => {
            switch (state) {
                case 'maximize': return setIsRestoredIcon(true)
                case 'restore': return setIsRestoredIcon(false)
            }
        })
    }, [])

    const handleOnWIndowButtonClick = (state: ToolbarState) => () => {
        const electron = (window as any).electron
        switch(state){
            case 'minimize': return electron.windowCollapse()
            case 'maximize-or-restored': return electron.windowMaximizeOrRestored()
            case 'close': return electron.windowClose()
        }
    }

    const handleToogleNavbar = () => props.onNavbarControl(prev => !prev)

    return (
        <div className="h-[40px] w-full flex bg-green-500">
            <button className="toolbar__button" onClick={handleToogleNavbar}>
                <MenuIcon />
            </button>
            <div className="toolbar__drag-container"></div>
            <div className="flex">
                <button className="toolbar__button" onClick={handleOnWIndowButtonClick('minimize')}>
                    <WindowIcons.Minimize />
                </button>
                <button className="toolbar__button" onClick={handleOnWIndowButtonClick('maximize-or-restored')}>
                    {isRestoredIcon
                        ? <WindowIcons.Restore />
                        : <WindowIcons.Maximize />}
                </button>
                <button className="toolbar__button toolbar__button_red" onClick={handleOnWIndowButtonClick('close')}>
                    <WindowIcons.Close />
                </button>
            </div>
        </div>
    )
}

export { Toolbar }