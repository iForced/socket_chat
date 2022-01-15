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

        io.on('connection', (socket) => {
            console.log('User connected')
            socket.on('send_message', async (message) => {
                const {senderId, text} = message
                await Message.create({senderId, receiverId: 4, text})
                const allMessages = await Message.findAndCountAll()
                io.emit('new_message_added', allMessages.rows)

            });

            (async function () {
                const response = await Message.findAndCountAll()
                socket.emit('send_init_messages', response.rows)
            })()
        })

        server.listen(PORT, () => console.log(`Server starts on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()