import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/app'
import '@fontsource/roboto'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto-mono/700.css'
import '@fontsource/roboto/900.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
