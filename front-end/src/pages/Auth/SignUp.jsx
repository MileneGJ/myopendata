import logo from '../../assets/logo-no-background.png'
import { useState } from "react";
import { signup } from "../../services/auth";
import { AuthContainer, Form } from "./AuthStyles";
import {Link, useNavigate} from 'react-router-dom'
import errorHandler from '../../utils/errorHandler';


export default function SignUp () {
    const [newUser,setNewUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const navigate = useNavigate()

    async function createUser (e) {
        e.preventDefault()
        try {
        await signup(newUser)
        navigate('/')
        } catch (error) {
            errorHandler(error)
        }
    }

    return (
        <AuthContainer>
            <img src={logo} alt =''  />
            <h1 style={{'marginBottom':'70px'}} >Easily find and store data online</h1>
            <Form onSubmit={createUser} className='auth'>
                <input 
                type='text' 
                placeholder='Name' 
                value={newUser.name} 
                onChange={e=>setNewUser({...newUser, name:e.target.value})} />

                <input 
                type='email' 
                placeholder='Email' 
                value={newUser.email} 
                onChange={e=>setNewUser({...newUser, email:e.target.value})} />

                <input 
                type='password' 
                placeholder='Password'
                value={newUser.password} 
                onChange={e=>setNewUser({...newUser, password:e.target.value})} />

                <input 
                type='password' 
                placeholder='Confirm Password'
                value={newUser.confirmPassword} 
                onChange={e=>setNewUser({...newUser, confirmPassword:e.target.value})} />

                <button type='submit'>Create account</button>
            </Form>
            <Link to='/'>Already have an account? Sign in</Link>
        </AuthContainer>
    )

}