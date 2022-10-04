import logo from '../../assets/logo-no-background.png'
import { HeaderSpan } from './HeaderStyles'

export default function Header () {
    return (
        <HeaderSpan>
            <img src={logo} alt=''/>
        </HeaderSpan>
    )
}