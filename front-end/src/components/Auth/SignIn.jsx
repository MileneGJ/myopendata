import logo from '../../assets/logo-no-background.png'
import { AuthContainer, Form } from './AuthStyles'
import {Link} from 'react-router-dom'

export default function SignIn () {

    function authenticateUser () {

    }

    return (
        <AuthContainer>
            <img src={logo} alt ='' />
            <Form onSubmit={authenticateUser}>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button type='submit'>Login</button>
            </Form>
            <Link to='/signup'>Do not have an account? Sign up here</Link>
        </AuthContainer>
    )
}