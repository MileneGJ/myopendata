import logo from '../../assets/logo-no-background.png'
import { HeaderSpan } from './LayoutStyles'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar';
import UserMenu from '../UserMenu';

export default function Header() {
    const navigate = useNavigate()

    return (
        <HeaderSpan>
            <img onClick={() => navigate('/home')} src={logo} alt='' />
            <SearchBar />
            <div style={{width:'100px'}}></div>
            <UserMenu />
        </HeaderSpan>
    )
}