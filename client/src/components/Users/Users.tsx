import React, { useEffect } from 'react'
// @ts-ignore
import s from './Users.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersRequest } from '../../redux/users/actions'
import { AppStateType } from '../../redux/store'
import { UserType } from '../../redux/auth/types'
import { NavLink } from 'react-router-dom'

const Users = () => {

    const dispatch = useDispatch()

    const users = useSelector<AppStateType, Array<UserType>>(state => state.usersReducer.users)
    const me = useSelector<AppStateType, UserType | null>(state => state.authReducer.user)

    useEffect(() => {
        dispatch(getAllUsersRequest())
    }, [])

    return (
        <div>
            {users
                .filter(user => user.id !== me!.id)
                .map(user =>
                    <NavLink
                        to={`/users/${user.id}`}
                        className={s.userItem}
                        key={user.id}
                    >Chat with {user.login}
                    </NavLink>
                )
            }
        </div>
    )
}

export default Users