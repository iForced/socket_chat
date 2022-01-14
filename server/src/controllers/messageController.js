import { Message } from '../models/models.js'

class MessageController {
    async add(req, res) {
        const {senderId, receiverId, text} = req.body

        if (!senderId || !receiverId || !text) return res.status(400).json({message: 'Enter required data'})
        const newMessage = await Message.create({senderId, receiverId, text})

        return res.json(newMessage)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 10
        const offset = page * limit - limit

        const allMessages = await Message.findAndCountAll({limit, offset})

        return res.json(allMessages)
    }

    async getByUserId(req, res) {
        const {userId} = req.params

        if (!userId) return res.status(400).json({message: 'User id not provided'})
        const myMessages = await Message.findAll({where: {senderId: userId}})

        return res.json(myMessages)
    }
}

export default new MessageController()