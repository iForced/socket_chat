import React, { useEffect, useState } from 'react'
// @ts-ignore
import s from './Chat.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { checkMeRequest } from '../../redux/auth/actions'
import io, { Socket } from 'socket.io-client'
import { MessageType } from '../../redux/chat/types'
import MessageItem from '../MessageItem/MessageItem'
import { addMessage, setInitMessages, setInitMessagesRequest, updateMessages } from '../../redux/chat/actions'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { UserType } from '../../redux/auth/types'

const socket = io('http://localhost:5000')

const Chat = () => {

    const [messageText, setMessageText] = useState<string>('')

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)
    const messages = useSelector<AppStateType, Array<MessageType>>(state => state.chatReducer.messages)
    const user = useSelector<AppStateType, UserType | null>(state => state.authReducer.user)

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
        socket.on('send_init_messages', (messages: Array<MessageType>) => {
            console.log(messages)
            dispatch(setInitMessages(messages))
        })
    }, [])

    useEffect(() => {
        socket.on('new_message_added', (updatedMessages: Array<MessageType>) => {
            dispatch(updateMessages(updatedMessages))
        })
    }, [])

    const handleMessageSend = () => {
        if (user) {
            socket.emit('send_message', {senderId: user.id, text: messageText})
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