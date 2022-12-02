import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './components/app-container'
import History from './pages/history'
import Timer from './pages/timer'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<AppContainer />}>
          <Route path="/" element={<Timer />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
