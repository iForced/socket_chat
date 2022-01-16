import React, { useEffect, useState } from 'react'
// @ts-ignore
import s from './Chat.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { checkMeRequest } from '../../redux/auth/actions'
import io  from 'socket.io-client'
import { MessageType } from '../../redux/chat/types'
import MessageItem from '../MessageItem/MessageItem'
import { setInitMessages, updateMessages } from '../../redux/chat/actions'
import { UserType } from '../../redux/auth/types'

const socket = io('http://localhost:5000')

const Chat = () => {

    const [messageText, setMessageText] = useState<string>('')

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)
    const messages = useSelector<AppStateType, Array<MessageType>>(state => state.chatReducer.messages)
    const user = useSelector<AppStateType, UserType | null>(state => state.authReducer.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userId: receiverId} = useParams()

    useEffect(() => {
        if (!isAuthorized) navigate('/login')
    }, [isAuthorized])
    //
    useEffect(() => {
        const token = localStorage.getItem('tokenChat')
        if (token) dispatch(checkMeRequest(token))
    }, [])

    useEffect(() => {
        if (user) {
            socket.emit('send_init_messages_request', {senderId: String(user.id), receiverId})
            socket.on('send_init_messages', (initMessages: Array<MessageType>) => {
                dispatch(setInitMessages(initMessages))
            })
        }
    }, [])

    useEffect(() => {
        socket.on('new_message_added', (updatedMessages: Array<MessageType>) => {
            dispatch(updateMessages(updatedMessages))
        })
    }, [])

    const handleMessageSend = () => {
        if (user) {
            socket.emit('send_message', {senderId: String(user.id), receiverId, text: messageText})
            setMessageText('')
        }
    }

    return (
        <div className={s.chat}>
            <div className={s.messagesField}>
                {messages.map(message =>
                    <MessageItem
                        key={message.id}
                        from={message.senderId}
                        to={message.receiverId}
                        text={message.text}
                    />)
                }
            </div>
            <textarea
                cols={30}
                rows={10}
                value={messageText}
                onChange={(e) => setMessageText(e.currentTarget.value)}
            />
            <button onClick={handleMessageSend}>Send message</button>
        </div>
    )
}

export default Chat