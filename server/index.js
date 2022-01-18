import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './db.js'
import router from './src/routes/index.js'
import { Message } from './src/models/models.js'
import Sequelize, { Op } from 'sequelize'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

app.use(cors({
    origin: 'http://localhost:3000',
    credential: true,
}))
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        let users = []

        const addUser = (userId, socketId) => {
            !users.some(user => user.userId === userId) && users.push({userId, socketId})
        }
        const removeUser = (socketId) => {
            users = users.filter(user => user.socketId !== socketId)
        }
        const getUser = (userId) => {
            return users.find(user => user.userId === userId)
        }

        io.on('connection', async (socket) => {
            console.log('User connected', socket.id)

            socket.on('ADD_USER', (userId) => {
                addUser(userId, socket.id)
                console.log('Connected users: ', users)
            })



            socket.on('USER_SEND_MESSAGE', async ({senderId, receiverId, text}) => {
                const addedMessage = await Message.create({senderId, receiverId, text})
                const user = getUser(receiverId)
                io.to(user.socketId).emit('SERVER_SEND_MESSAGE', addedMessage)
            })



            socket.on('disconnect', () => {
                removeUser(socket.id)
                console.log('User disconnected', socket.id)
            })
        })

        server.listen(PORT, () => console.log(`Server starts on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()



// socket.on('JOIN_MY_ROOM', ({myRoomId, targetRoomId}) => {
//     socket.join([myRoomId, targetRoomId])
//     io.to(targetRoomId).emit('CONNECTED_TO_ROOM', `User connected to ${targetRoomId}`)
//     console.log(io.sockets.adapter.rooms)
//
//     socket.on('USER_SENT_MESSAGE', ({newMessage, receiverId}) => {
//         const message = Message.create({senderId: newMessage.senderId, text: newMessage.text})
//         io.to(receiverId).emit('SERVER_SENT_MESSAGE', message)
//     })
//
//     socket.on('DISCONNECTED_FROM_ROOM', ({message, targetRoomId}) => {
//         socket.leave(targetRoomId)
//         console.log(message)
//         console.log(io.sockets.adapter.rooms)
//     })
// })
//
// socket.on('disconnect', (reason) => {
//     console.log('User disconnected', reason)
// })