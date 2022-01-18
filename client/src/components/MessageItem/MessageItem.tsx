import React, { FC } from 'react'
// @ts-ignore
import s from './MessageItem.module.css'

type PropsType = {
    from: string
    text: string
}

const MessageItem: FC<PropsType> = ({from, text}) => {
    return (
        <div className={s.message}>
            <h5 className={s.fromUser}>From: <span className={s.userName}>{from}</span></h5>
            <div>Text: <span className={s.messageText}>{text}</span></div>
        </div>
    )
}

export default MessageItem