import React, { useEffect, useRef, useState } from 'react'
// @ts-ignore
import s from './Chat.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { checkMeRequest } from '../../redux/auth/actions'
import io, { Socket } from 'socket.io-client'
import { MessageType } from '../../redux/chat/types'
import MessageItem from '../MessageItem/MessageItem'
import { addMessage } from '../../redux/chat/actions'
import { UserType } from '../../redux/auth/types'

// type UserType = {
//     id: string
//     login: string
//     password: string
// }
// type MessageType = {
//     id: string
//     ownerId: string
//     text: string
// }
// type ConversationType = {
//     id: string
//     members: Array<UserType>
//     messages: Array<MessageType>
// }
// type DB = {
//     users: Array<UserType>
//     conversations: Array<ConversationType>
// }


const Chat = () => {

    const [messageText, setMessageText] = useState<string>('')
    const socket = useRef<Socket>()

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)
    const messages = useSelector<AppStateType, Array<MessageType>>(state => state.chatReducer.messages)
    const user = useSelector<AppStateType, UserType | null>(state => state.authReducer.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userId: receiverId} = useParams()

    useEffect(() => {
        if (!isAuthorized) navigate('/login')
    }, [isAuthorized])

    useEffect(() => {
        const token = localStorage.getItem('tokenChat')
        if (token) dispatch(checkMeRequest(token))
    }, [])



    useEffect(() => {
        socket.current = io('ws://localhost:5000')

        return () => {
            socket.current!.disconnect()
        }
    }, [])

    useEffect(() => {
        socket.current!.emit('ADD_USER', user!.id)
    }, [user])

    useEffect(() => {
        socket.current!.on('SERVER_SEND_MESSAGE', (message: MessageType) => {
            // dispatch(addMessage(message))
        })
    }, [])




    const handleMessageSend = () => {
        const message = {
            senderId: user!.id,
            receiverId,
            text: messageText,
        }
        socket.current!.emit('USER_SEND_MESSAGE', message)
        setMessageText('')
    }


    return (
        <div className={s.chat}>
            {user!.login}
            <div className={s.messagesField}>
                {messages.map(message =>
                    <MessageItem
                        key={message.id}
                        from={message.senderId}
                        text={message.text}
                    />)
                }
            </div>
            <textarea
                className={s.messageInput}
                value={messageText}
                onChange={(e) => setMessageText(e.currentTarget.value)}
            />
            <button className={s.sendMessageButton} onClick={handleMessageSend}>Send message</button>
        </div>
    )
}

export default Chat


// useEffect(() => {
//
//     socket.emit('JOIN_MY_ROOM', {myRoomId: user!.id, targetRoomId: receiverId})
//
//     socket.on('CONNECTED_TO_ROOM', (message) => console.log(message))
//
//     return () => {
//         socket.disconnect()
//         socket.emit('DISCONNECTED_FROM_ROOM', {
//             message: `User ${user!.id} disconnected from this room`,
//             targetRoomId: receiverId,
//         })
//     }
// }, [])
//
// useEffect(() => {
//     socket.on('SERVER_SENT_MESSAGE', (message: MessageType) => {
//         dispatch(addMessage(message))
//     })
// }, [])
//
// const handleMessageSend = () => {
//     const newMessage = {
//         senderId: user!.id,
//         receiverId,
//         messageText,
//     }
//     socket.emit('USER_SENT_MESSAGE', {newMessage, receiverId})
//     setMessageText('')
// }
