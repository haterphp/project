import { Route, Router } from 'electron-router-dom'

import { RouterPath } from './path'

import { UFGreetingPage, UFResultPage, UFUploadPage } from '@app/pages/upload-form'
import { Navigate } from 'react-router-dom'
import { AboutApplicationPage, AboutDevPage } from '@app/pages/about'
import { ApplicationLayout, FormLayout } from '@app/tools/layout'

const AppRouter = () => {
    return (
        <Router
            main={
                <Route path={''} element={<ApplicationLayout/>}>
                    <Route path={''} element={<FormLayout />}>
                        <Route path={RouterPath.UF_GREETING} element={<UFGreetingPage />} />
                        <Route path={RouterPath.UF_UPLOAD} element={<UFUploadPage />} />
                        <Route path={RouterPath.UF_RESULTS} element={<UFResultPage />} />
                    </Route>            

                    <Route path={RouterPath.ABOUT_APP} element={<AboutApplicationPage />} />
                    <Route path={RouterPath.ABOUT_DEV} element={<AboutDevPage />} />

                    <Route path='*' element={<Navigate to={''} />} />
                </Route>
            }
        />
    )
}

export { AppRouter }