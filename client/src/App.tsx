import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Register from './pages/register'
import UserProfile from './pages/user-profile'

import Header from './components/header'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users/:username" element={<UserProfile />} />
            </Routes>
        </>
    )
}

export default App
