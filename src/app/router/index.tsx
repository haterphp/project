import { Route, Router } from 'electron-router-dom'

import { ApplicationLayout } from '@app/tools'
import { PREFIX, RouterPath } from './path'

import { UFGreetingPage, UFResultPage, UFUploadPage } from '@app/pages/upload-form'

const AppRouter = () => {
    return (
        <Router
            main={
                <Route path={PREFIX} element={<ApplicationLayout/>}>
                    <Route path={RouterPath.UF_GREETING} element={<UFGreetingPage />} />
                    <Route path={RouterPath.UF_UPLOAD} element={<UFUploadPage />} />
                    <Route path={RouterPath.UF_RESULTS} element={<UFResultPage />} />
                </Route>
            }
        />
    )
}

export { AppRouter }