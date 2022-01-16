import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './db.js'
import router from './src/routes/index.js'
import { Message } from './src/models/models.js'

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

        io.on('connection', async (socket) => {
            console.log('User connected')

            socket.on('send_init_messages_request', async (params) => {
                const {senderId, receiverId} = params
                const response = await Message.findAll({where: {senderId, receiverId}})
                io.emit('send_init_messages', response)
            })

            socket.on('send_message', async (message) => {
                const {senderId, receiverId, text} = message
                await Message.create({senderId, receiverId, text})
                const updatedMessages = await Message.findAll({where: {senderId, receiverId}})
                io.emit('new_message_added', updatedMessages)
            })
        })

        server.listen(PORT, () => console.log(`Server starts on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()