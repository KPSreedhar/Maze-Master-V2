import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Play from './pages/Play'
import Vault from './pages/Vault'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:difficultyKey" element={<Play />} />
      <Route path="/vault" element={<Vault />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
