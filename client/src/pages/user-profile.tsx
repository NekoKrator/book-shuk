import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { userState } from '../context/user-context'
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    username: string
}

const UserProfile: React.FC = observer(() => {
    const { username } = useParams<{ username: string }>()
    const token = localStorage.getItem('token')
    let loggedInUsername: string | null = null

    if (token) {
        try {
            const decodedToken = jwtDecode<DecodedToken>(token)
            loggedInUsername = decodedToken.username
        } catch (error) {
            console.error('Ошибка декодирования токена', error)
        }
    }

    useEffect(() => {
        if (username) {
            userState.fetchUserByUsername(username)
        }
    }, [username])

    if (userState.loading) {
        return <div>Завантаження...</div>
    }

    if (userState.error) {
        return <div>{userState.error}</div>
    }

    if (!userState.user) {
        return <div>Користувач не знайдений</div>
    }

    const isCurrentUser = loggedInUsername === username

    return (
        <div>
            <h1>{userState.user.username}</h1>
            <p>Email: {userState.user.email}</p>

            {isCurrentUser && <button onClick={() => userState.logout()}>Вийти</button>}
        </div>
    )
})

export default UserProfile
