import { useState, FormEvent } from 'react'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authStore } from '../context/auth-context'

interface LoginData {
    email: string
    password: string
}

const Login: React.FC = observer(() => {
    const navigate = useNavigate()

    const [data, setData] = useState<LoginData>({
        email: '',
        password: '',
    })

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, password } = data

        try {
            const response = await axios.post('/auth/login', { email, password })
            const { token, username } = response.data

            authStore.login({ token, username })
            setData({ email: '', password: '' })
            navigate('/')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login error:', error.response?.data || error.message)
            } else {
                console.error('Unexpected error:', error)
            }
        }
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input type="email" placeholder="Введите email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                <label>Password</label>
                <input type="password" placeholder="Введите пароль" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                <button type="submit">Войти</button>
            </form>
        </div>
    )
})

export default Login
