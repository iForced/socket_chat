import React, { useState, MouseEvent, useEffect } from 'react'
// @ts-ignore
import s from  './Register.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerRequest } from '../../redux/auth/actions'
import { AppStateType } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)

    const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(registerRequest(login, password))
        setLogin('')
        setPassword('')
    }

    useEffect(() => {
        if (isAuthorized) navigate('/')
    }, [isAuthorized])

    return (
        <form className={s.registerForm}>
            <div>Registration</div>
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
                onClick={handleRegister}
            >Register
            </button>
        </form>
    )
}

export default Register
