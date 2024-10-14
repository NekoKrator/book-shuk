import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        username: '',
        password: '',
    })

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, username, password } = data
        console.log(data)
        try {
            await axios.post('/auth/register', {
                email,
                username,
                password,
            })
            setData({
                email: '',
                username: '',
                password: '',
            })
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={registerUser}>
                <label>Email</label>
                <input type="email" placeholder="Enter email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                <label>Username</label>
                <input type="text" placeholder="Enter username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                <label>Password</label>
                <input type="password" placeholder="Enter password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register
