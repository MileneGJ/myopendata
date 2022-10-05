import logo from '../../assets/logo-no-background.png'
import { HeaderSpan } from './HeaderStyles'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

export default function Header () {
    const navigate = useNavigate()
    const [search,setSearch] = useState({
        content:'',
        field:'keyword'
    })

    function goToSearch (e) {
        e.preventDefault()
            navigate(`/search?${search.field}=${search.content}`)
    }


    return (
        <HeaderSpan>
            <img onClick={()=>navigate('/home')} src={logo} alt=''/>
            <form onSubmit={goToSearch}>
            <input
            type='text' 
            placeholder='Search' 
            value={search.content}
            onChange={e=>setSearch({...search, content:e.target.value})}
            />
            <select
            onChange={e=>setSearch({...search,field:e.target.value})}
            >
                <option value='keyword'>Keyword</option>
                <option value='title'>Title</option>
                <option value='user'>Author</option>
            </select>

            </form>
            <div>UserName</div>
        </HeaderSpan>
    )
}