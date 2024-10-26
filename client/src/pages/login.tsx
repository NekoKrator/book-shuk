import { useState, FormEvent } from 'react'
import { observer } from 'mobx-react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { authState } from '../context/auth-context'
import { userState } from '@/context/user-context'

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

            authState.login({ token, username })
            userState.loggedInUser = { username, email }

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-[#122a5b] mb-6">Login</h2>
                <form onSubmit={loginUser}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-[#122a5b] mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-[#122a5b] mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#f9bc52] text-[#122a5b] font-semibold rounded-md py-2 hover:bg-[#122a5b] hover:text-[#edeece] transition duration-200">
                        Log In
                    </button>
                </form>
                <Link to="/register" className="block mt-4 font-semibold text-sm text-center text-[#122a5b] relative group">
                    <span className="relative">
                        Create an account
                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#122a5b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                    </span>
                </Link>
            </div>
        </div>
    )
})

export default Login
