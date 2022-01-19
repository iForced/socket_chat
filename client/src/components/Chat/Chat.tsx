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
import { addMessage, setCurrentConversation, setInitMessagesForConversation } from '../../redux/chat/actions'
import { UserType } from '../../redux/auth/types'
import { messagesAPI } from '../../api/messagesAPI'

const Chat = () => {

    const [messageText, setMessageText] = useState<string>('')
    const socket = useRef<Socket>()

    const isAuthorized = useSelector<AppStateType, boolean>(state => state.authReducer.isAuthorized)
    const messages = useSelector<AppStateType, Array<MessageType>>(state => state.chatReducer.messages)
    const user = useSelector<AppStateType, UserType | null>(state => state.authReducer.user)
    const conversation = useSelector<AppStateType, string>(state => state.chatReducer.currentConversation)

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
        const getConversation = async () => {
            const foundedConversation = await messagesAPI.getConversation(user!.id, receiverId!)
            if (!foundedConversation) {
                const createdConversation = await messagesAPI.createConversation(user!.id, receiverId!)
                dispatch(setCurrentConversation(createdConversation.id))
                dispatch(setInitMessagesForConversation([]))
            } else {
                dispatch(setCurrentConversation(foundedConversation.id))
                const messagesFromConversation = await messagesAPI.getMessagesFromConversation(foundedConversation.id)
                dispatch(setInitMessagesForConversation(messagesFromConversation))
            }
        }
        getConversation()

    }, [receiverId])

    useEffect(() => {
        socket.current!.on('SERVER_SEND_MESSAGE', (message: MessageType) => {
            dispatch(addMessage(message))
        })
    }, [])

    const handleMessageSend = async () => {
        const addedMessage = await messagesAPI.addMessage(user!.id, receiverId!, conversation, messageText)
        socket.current!.emit('USER_SEND_MESSAGE', addedMessage)
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
