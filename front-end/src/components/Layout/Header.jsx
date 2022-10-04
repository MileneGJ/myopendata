import logo from '../../assets/logo-no-background.png'
import { HeaderSpan } from './HeaderStyles'
import {useNavigate} from 'react-router-dom'

export default function Header () {
    const navigate = useNavigate()
    return (
        <HeaderSpan>
            <img onClick={()=>navigate('/home')} src={logo} alt=''/>
            <div>
            <input placeholder='Search' />
            <select>
                <option value=''>Field...</option>
                <option value='keyword'>Keyword</option>
                <option value='title'>Title</option>
                <option value='user'>Author</option>
            </select>

            </div>
            <span>UserName</span>
        </HeaderSpan>
    )
}