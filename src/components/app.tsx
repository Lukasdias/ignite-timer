import Router from '../router'
import { PomodoroProvider } from '../services/usePomodoro'
import { Layout } from './layout'

function App() {
  return (
    <PomodoroProvider>
      <Layout>
        <Router />
      </Layout>
    </PomodoroProvider>
  )
}
export default App
