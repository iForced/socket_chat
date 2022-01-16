import React, { FC } from 'react'
// @ts-ignore
import s from './MessageItem.module.css'

type PropsType = {
    from: string
    to: string
    text: string
}

const MessageItem: FC<PropsType> = ({from, to, text}) => {
    return (
        <div className={s.message}>
            <h3>From: {from}</h3>
            <h3>To: {to}</h3>
            <div>Text: {text}</div>
        </div>
    )
}

export default MessageItem