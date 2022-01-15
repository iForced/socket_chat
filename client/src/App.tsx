import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import Chat from './components/Chat/Chat'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

const App = () => {

    // useEffect(() => {
    //     const socket = io('http://localhost:5000')
    // }, [])

    return (
        <div>
            <Routes>
                <Route path='/' element={<Chat/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </div>
    )
}

export default App
