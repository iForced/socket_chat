import { User } from '../models/models.js'

class UsersController {
    async getAll(req, res) {
        const allUsers = await User.findAll()
        return res.json(allUsers)
    }
}

export default new UsersController()
