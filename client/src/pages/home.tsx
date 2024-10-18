import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { userState } from '../context/user-context'
import { authState } from '../context/auth-context'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = observer(() => {
    const user = userState.loggedInUser
    const navigate = useNavigate()

    useEffect(() => {
        const username = authState.username

        if (username) {
            userState.loadLoggedInUser(username)
        }
    }, [])

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.username}!</h1>
                    <button onClick={() => navigate(`/users/${user.username}`)}>My profile</button>
                </div>
            ) : (
                <div>
                    <h1>Please Log In</h1>
                    <button onClick={() => navigate('/login')}>Log In</button>
                </div>
            )}

            <a href="http://localhost:5173/users/NekoKrator">Best Account</a>
        </div>
    )
})

export default Home
