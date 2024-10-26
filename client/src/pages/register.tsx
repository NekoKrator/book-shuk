import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

interface RegisterData {
    email: string
    username: string
    password: string
}

const Register: React.FC = () => {
    const navigate = useNavigate()

    const [data, setData] = useState<RegisterData>({
        email: '',
        username: '',
        password: '',
    })

    const registerUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, username, password } = data
        try {
            await axios.post('/auth/register', { email, username, password })
            setData({ email: '', username: '', password: '' })
            navigate('/login')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration error:', error.response?.data || error.message)
            } else {
                console.error('Unexpected error:', error)
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-[#122a5b] mb-6">Register</h2>
                <form onSubmit={registerUser}>
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
                        <label className="block text-sm font-semibold text-[#122a5b] mb-2">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
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
                        Sign Up
                    </button>
                </form>
                <Link to="/login" className="block mt-4 font-semibold text-sm text-center text-[#122a5b] relative group">
                    <span className="relative">
                        Already have an account?
                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#122a5b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Register
