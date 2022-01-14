import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
    console.log('User connected')
})

server.listen(PORT, () => console.log(`Server starts on port ${PORT}`))