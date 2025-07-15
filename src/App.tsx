import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouteLoading from '@/components/RouteLoading'
import Login from '@/pages/Login'
import HomePage from '@/pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <RouteLoading>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          {/* ...outras rotas... */}
        </Routes>
      </RouteLoading>
    </BrowserRouter>
  )
}

export default App