import { observer } from 'mobx-react'
import { userState } from '../context/user-context'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = observer(() => {
    const user = userState.loggedInUser
    const navigate = useNavigate()

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
        </div>
    )
})

export default Home
