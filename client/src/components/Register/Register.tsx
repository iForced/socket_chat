import React, { useState, MouseEvent } from 'react'
// @ts-ignore
import s from  './Register.module.css'
import { useDispatch } from 'react-redux'
import { registerRequest } from '../../redux/auth/actions'

const Register = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch()

    const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(registerRequest(login, password))
    }

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