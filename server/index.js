import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './db.js'
import router from './src/routes/index.js'

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

            socket.on('ADD_USER', async (userId) => {
                addUser(userId, socket.id)
                console.log('Connected users: ', users)
            })

            socket.on('USER_SEND_MESSAGE', async (mess) => {
                const user = getUser(mess.receiverId)
                io.to(user.socketId).emit('SERVER_SEND_MESSAGE', mess)
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
