import logo from '../../assets/logo-no-background.png'
import errorHandler from "../../utils/errorHandler";
import { HeaderSpan, UserOptions } from './HeaderStyles'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deleteUser, getUserName } from '../../services/users'

export default function Header() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState(null)
    const [appearOptions, setAppearOptions] = useState(false)
    const [search, setSearch] = useState({
        content: '',
        field: 'keyword'
    })
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            alert('User not logged in')
            navigate('/')
        } else {
            async function getName() {
                try {
                    const data = await getUserName(token)
                    setUserName(data.name)
                } catch (error) {
                    errorHandler(error)
                }
            }
            getName()
        }
    }, [])

    function goToSearch(e) {
        e.preventDefault()
        navigate(`/search?${search.field}=${search.content}`)
    }

    function deleteSession() {
        localStorage.removeItem('token');
        navigate('/')
    }

    async function deleteAccount(){
        try {
            await deleteUser(token)
            alert('User was successfully deleted')
            navigate('/')
        } catch (error) {
            errorHandler(error)
        }
    }

    function showOptions() {
        setAppearOptions(!appearOptions)
    }


    return (
        <HeaderSpan visible={appearOptions}>
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
            <div style={{width:'100px'}}></div>
            <div onClick={showOptions}>
                <p>{userName}</p>
                <UserOptions visible={appearOptions}>
                    <Link to={`/search?user=${userName}`}>My files</Link>
                    <p onClick={deleteSession}>Logout</p>
                    <p onClick={deleteAccount}>Delete account</p>
                </UserOptions>
            </div>
        </HeaderSpan>
    )
}