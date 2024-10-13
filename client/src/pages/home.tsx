import { observer } from 'mobx-react'
import { authStore } from '../context/auth-context'

const Home: React.FC = observer(() => {
    // Проверяем, вошел ли пользователь
    const user = authStore.user

    return (
        <div>
            {user ? (
                <h1>Добро пожаловать, {user.username}!</h1> // Отображение имени пользователя
            ) : (
                <h1>Пожалуйста, войдите в систему</h1>
            )}
            {/* Здесь можно добавить дополнительный контент */}
        </div>
    )
})

export default Home
