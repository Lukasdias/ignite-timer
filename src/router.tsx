import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './components/app-container'
import History from './pages/history'
import Home from './pages/home'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<AppContainer />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
