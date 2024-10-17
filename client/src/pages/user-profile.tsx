import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { userState } from '../context/user-context'
import { authState } from '../context/auth-context'
import { useParams, useNavigate } from 'react-router-dom'
import BookSearch from '../components/books/book-search'
import BookList from '../components/books/book-list'

const UserProfile: React.FC = observer(() => {
    const navigate = useNavigate()
    const { username } = useParams<{ username: string }>()
    const loggedInUser = userState.loggedInUser
    const isCurrentUser = loggedInUser?.username === username

    const handleLogout = () => {
        authState.logout()
        navigate('/login')
    }

    useEffect(() => {
        console.log(userState.user)
    })

    useEffect(() => {
        if (username) {
            userState.loadUser(username)
        }
    }, [username])

    if (userState.loading) {
        return <div>Loading...</div>
    }

    if (userState.error) {
        return <div>{userState.error}</div>
    }

    if (!userState.user) {
        return <div>User not found</div>
    }

    return (
        <div>
            <h1>{userState.user.username}</h1>
            <p>Email: {userState.user.email}</p>

            {isCurrentUser && (
                <div>
                    <button onClick={handleLogout}>Log Out</button>
                    <button onClick={() => navigate('/')}>Go to Home</button>
                    <div>
                        <h1>Add a New Book</h1>
                        <BookSearch />
                    </div>
                </div>
            )}
            <BookList books={userState.user?.availableBooks} />
        </div>
    )
})

export default UserProfile
