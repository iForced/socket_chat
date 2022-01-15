import React, { MouseEvent, useState } from 'react'
// @ts-ignore
import s from './Login.module.css'
import { useDispatch } from 'react-redux'
import { loginRequest } from '../../redux/auth/actions'

const Login = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch()

    const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(loginRequest(login, password))
    }

    return (
        <form className={s.loginForm}>
            <div>Login</div>
            <input
                type="text"
                placeholder='Enter login'
                value={login}
                onChange={(e) => setLogin(e.currentTarget.value)}
            />
            <input
                type="password"
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button
                type='submit'
                onClick={handleLogin}
            >Login
            </button>
        </form>
    )
}

export default Login