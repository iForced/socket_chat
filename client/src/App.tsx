import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { NavLink, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat/Chat'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from './redux/auth/actions'
import { AppStateType } from './redux/store'

const App = () => {

    // useEffect(() => {
    //     const socket = io('http://localhost:5000')
    // }, [])

    const dispatch = useDispatch()

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)

    const handleLogout = () => {
        dispatch(logoutRequest())
    }

    return (
        <div>
            <div>
                <NavLink to='/'>Chat</NavLink>
                <NavLink to='/register'>Register</NavLink>
                <NavLink to='/login'>Login</NavLink>
                {isAuthorized
                    ? <button onClick={handleLogout}>Logout</button>
                    : <button>Login</button>
                }
            </div>
            <Routes>
                <Route path='/' element={<Chat/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </div>
    )
}

export default App
