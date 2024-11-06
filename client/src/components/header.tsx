import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { userState } from '../context/user-context'

const Header = observer(() => {
    const isLoggedIn = !!userState.loggedInUser

    const routes = [
        { label: 'Home', path: '/' },
        { label: 'Search', path: '/search' },
        { label: 'Exchanges', path: '/exchanges' },
        { label: 'Wishlist', path: '/wishlist' },
        { label: 'About', path: '/about' },
    ]

    return (
        <header className="bg-[#122a5b] text-[#edeece] p-4 fixed top-0 left-0 w-full z-9999 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <Link to={'/'}>
                    <div className="text-2xl font-bold relative group">
                        Bookשוק
                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                    </div>
                </Link>

                <nav>
                    <ul className="flex space-x-6">
                        {routes.map((route) => (
                            <li key={route.label}>
                                <Link to={route.path} className="text-[#edeece] hover:text-[#edeece] relative group">
                                    {route.label}
                                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    {isLoggedIn ? (
                        <Link to={`/users/${userState.loggedInUser?.username}`} className="relative group text-[#edeece] hover:text-[#edeece]">
                            {userState.loggedInUser?.username}
                            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#edeece] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                        </Link>
                    ) : (
                        <Link to={'/login'} className="relative group text-[#edeece] hover:text-[#edeece]">
                            Log In
                            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#edeece] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
})

export default Header
