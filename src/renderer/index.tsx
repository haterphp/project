import { createRoot } from 'react-dom/client'

import App from '@app/index'

function render() {
    const container = document.getElementById('root')

    if (container !== null) {
        
        const root = createRoot(container)
        
        root.render(
            <App />
        )
    }
}

render();