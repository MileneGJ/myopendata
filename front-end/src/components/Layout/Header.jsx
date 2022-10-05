import logo from '../../assets/logo-no-background.png'
import errorHandler from "../../utils/errorHandler";
import { HeaderSpan } from './HeaderStyles'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserName } from '../../services/friends'

export default function Header() {
    const [userName, setUserName] = useState(null)
    const navigate = useNavigate()
    const [search, setSearch] = useState({
        content: '',
        field: 'keyword'
    })
    const token = localStorage.getItem('token')

    function goToSearch(e) {
        e.preventDefault()
        navigate(`/search?${search.field}=${search.content}`)
    }

    useEffect(() => {
        async function getName() {
            try {
                const data = await getUserName(token)
                setUserName(data.name)
            } catch (error) {
                errorHandler(error)
            }
        }
        getName()
    }, [])


    return (
        <HeaderSpan>
            <img onClick={() => navigate('/home')} src={logo} alt='' />
            <form onSubmit={goToSearch}>
                <input
                    type='text'
                    placeholder='Search'
                    value={search.content}
                    onChange={e => setSearch({ ...search, content: e.target.value })}
                />
                <select
                    onChange={e => setSearch({ ...search, field: e.target.value })}
                >
                    <option value='keyword'>Keyword</option>
                    <option value='title'>Title</option>
                    <option value='user'>Author</option>
                </select>

            </form>
            <div>{userName}</div>
        </HeaderSpan>
    )
}