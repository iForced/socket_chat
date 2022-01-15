import React, { MouseEvent, useEffect, useState } from 'react'
// @ts-ignore
import s from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest } from '../../redux/auth/actions'
import { useNavigate } from 'react-router-dom'
import { AppStateType } from '../../redux/store'

const Login = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)

    const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(loginRequest(login, password))
        setLogin('')
        setPassword('')
    }

    useEffect(() => {
        if (isAuthorized) navigate('/')
    }, [isAuthorized])

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