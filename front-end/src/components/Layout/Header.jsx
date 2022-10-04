import logo from '../../assets/logo-no-background.png'
import { HeaderSpan } from './HeaderStyles'

export default function Header () {
    return (
        <HeaderSpan>
            <img src={logo} alt=''/>
            <input placeholder='Search' />
            <select>
                <option value='keyword'>Keyword</option>
                <option value='title'>Title</option>
                <option value='user'>Author</option>
            </select>
            <div>UserName</div>
        </HeaderSpan>
    )
}