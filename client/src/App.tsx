import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Register from './pages/register'
import UserProfile from './pages/user-profile'
import SearchPage from './pages/search'

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
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </>
    )
}

export default App
