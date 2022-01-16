import React from 'react'
// @ts-ignore
import s from './App.module.css'
import { Route, Routes } from 'react-router-dom'
import Chat from './components/Chat/Chat'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Users from './components/Users/Users'
import Profile from './components/Profile/Profile'
import Navbar from './components/Navbar/Navbar'

const App = () => {

    return (
        <div className={s.app}>
            <Navbar/>
            <div className={s.appContainer}>
                <Routes>
                    <Route path="/" element={<Profile/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/users/:userId" element={<Chat/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
