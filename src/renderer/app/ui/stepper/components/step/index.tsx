import { MouseEventHandler, useMemo } from "react"
import CLASSNAMES from '../../index.module.css'

interface IStep {
    key: string
    title: string
    disabled?: boolean
}

interface IStepProps extends IStep {
    isActive: boolean
    onClick: MouseEventHandler
}

const Step = (props: IStepProps) => {
    
    const innerClassname = useMemo(() => {
        return [
            CLASSNAMES.stepper__step,
            props.isActive ? CLASSNAMES.stepper__step_active : null
        ].filter(item => item !== null).join(' ')
    }, [props.isActive])
    
    return (
        <button 
            className={innerClassname} 
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.title}
        </button>
    )
}

export type { IStep }
export { Step }