import React from 'react'
// @ts-ignore
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { logoutRequest } from '../../redux/auth/actions'

const Navbar = () => {

    const dispatch = useDispatch()

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)

    const handleLogout = () => {
        dispatch(logoutRequest())
    }

    return (
        <nav className={s.navBar}>
            <NavLink className={s.navLink + ' ' + s.navItem} to='/'>Profile</NavLink>
            <NavLink className={s.navLink + ' ' + s.navItem} to='/users'>Users</NavLink>
            <NavLink className={s.navLink + ' ' + s.navItem} to='/register'>Register</NavLink>
            <NavLink className={s.navLink + ' ' + s.navItem} to='/login'>Login</NavLink>
            {isAuthorized
                ? <button className={s.loginButton + ' ' + s.navItem} onClick={handleLogout}>Logout</button>
                : <button className={s.loginButton + ' ' + s.navItem}>Login</button>
            }
        </nav>
    )
}

export default Navbar
