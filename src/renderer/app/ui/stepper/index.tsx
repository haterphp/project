import { Step, IStep } from './components/step'

import CLASSNAMES from './index.module.css'

interface IStepperProps {
    steps: IStep[]

    onActive: (key: string) => boolean
    onClick: (key: string) => void
}

const Stepper = (props: IStepperProps): JSX.Element => {

    const handleOnClick = (key: string) => () => props.onClick(key)

    return (
        <div className={CLASSNAMES.stepper}>
            {
                props.steps.map((item) => (
                    <Step 
                        {...item} 
                        key={item.key}
                        isActive={props.onActive(item.key)} 
                        onClick={handleOnClick(item.key)}
                    />
                ))
            }
        </div>
    )
}

export { Stepper }