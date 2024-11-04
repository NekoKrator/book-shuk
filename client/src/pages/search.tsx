import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchPage = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(search)
    const mode = queryParams.get('mode') || 'add'
    const title = queryParams.get('q')

    useEffect(() => {
        // Если mode не указан, перенаправить на /search с mode=add
        if (!queryParams.get('mode')) {
            navigate(`/search?q=${title || ''}&mode=add`)
        }
    }, [navigate, queryParams, title])

    return (
        <div className="mt-60">
            {mode === 'add' ? (
                <div>
                    <h1>Add Book</h1>
                    {title}
                </div>
            ) : mode === 'exchange' ? (
                <div>
                    <h1>Exchange Book</h1>
                </div>
            ) : (
                <div>
                    <h1>Invalid mode</h1>
                </div>
            )}
        </div>
    )
}

export default SearchPage
