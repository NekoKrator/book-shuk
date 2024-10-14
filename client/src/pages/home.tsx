import { observer } from 'mobx-react'
import { authState } from '../context/auth-context'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = observer(() => {
    // Проверяем, вошел ли пользователь
    const user = authState.user
    const navigate = useNavigate()

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.username}!</h1> // Отображение имени пользователя
            ) : (
                <div>
                    <h1>Please Log In</h1>
                    <button onClick={() => navigate('/register')}>Sign Up</button>
                </div>
            )}
            {/* Здесь можно добавить дополнительный контент */}
        </div>
    )
})

export default Home
