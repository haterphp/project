import { Outlet } from 'react-router-dom'
import CLASSNAMES from './index.module.css'
import { LayoutStepper } from '../common/stepper'

const FormLayout = () => {
    return (
        <>
            <div className={CLASSNAMES.layout__stepper}>
                <LayoutStepper />
            </div>

            <div className={CLASSNAMES.layout__content}>
                <Outlet />
            </div>
        </>
    )
}

export { FormLayout }