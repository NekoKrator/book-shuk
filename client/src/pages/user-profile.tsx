import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { userState } from '../context/user-context'
import { useParams, useNavigate } from 'react-router-dom'
import BookSearch from '../components/books/book-search'
import BookList from '../components/books/book-list'

const UserProfile: React.FC = observer(() => {
    const navigate = useNavigate()
    const { username } = useParams<{ username: string }>()
    const isCurrentUser = userState.loggedInUser?.username === username

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
        <div className="mt-20">
            <h1>{userState.user.username}</h1>
            <p>Email: {userState.user.email}</p>
            <button onClick={() => navigate('/')}>Home Page</button>

            {isCurrentUser && (
                <div>
                    <button
                        onClick={() => {
                            userState.loggedInUser = null
                            navigate('/login')
                        }}
                    >
                        Log Out
                    </button>
                    <div>
                        <h1>Add a New Book</h1>
                        <BookSearch />
                    </div>
                </div>
            )}
            <BookList books={userState.availableBooks} />
        </div>
    )
})

export default UserProfile
