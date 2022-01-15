import React, { useEffect } from 'react'
// @ts-ignore
import s from './Chat.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { checkMeRequest } from '../../redux/auth/actions'
import io from 'socket.io-client'
import { MessageType } from '../../redux/chat/types'
import MessageItem from '../MessageItem/MessageItem'

const Chat = () => {

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)
    const messages = useSelector<AppStateType, Array<MessageType>>(state => state.chatReducer.messages)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthorized) navigate('/login')
    }, [isAuthorized])

    useEffect(() => {
        const token = localStorage.getItem('tokenChat')
        if (token) dispatch(checkMeRequest(token))
    }, [])

    useEffect(() => {
        const socket = io('http://localhost:5000')
    }, [])

    return (
        <div className={s.chat}>
            <div className={s.messagesField}>
                {messages.map(message =>
                    <MessageItem
                        key={message.id}
                        from={message.senderId}
                        to={message.receiverId}
                        text={message.text}
                    />)}
            </div>
            <button>Send message</button>
        </div>
    )
}

export default Chat