import { Routes, Route } from 'react-router-dom'
import './configs/axios-config'
import Login from './pages/login'
import Home from './pages/home'
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default App
