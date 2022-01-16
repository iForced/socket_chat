import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { UserType } from '../../redux/auth/types'
import { checkMeRequest } from '../../redux/auth/actions'

const Profile = () => {

    const user = useSelector<AppStateType, UserType | null>(state => state.authReducer.user)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthorized) navigate('/login')
    }, [isAuthorized])

    useEffect(() => {
        const token = localStorage.getItem('tokenChat')
        if (token) dispatch(checkMeRequest(token))
    }, [])

    return (
        <div>
            {user
                ? <h2>You are logged in as {user.login}</h2>
                : <h2>You are not logged in</h2>
            }
            <NavLink to="/users">Show all users</NavLink>
        </div>
    )
}

export default Profile