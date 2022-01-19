import {User} from "../models/models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController {
    async register(req, res) {
        const {login, password} = req.body

        if (!login || !password) return res.status(400).json({message: 'Enter login and password'})
        const candidate = await User.findOne({where: {login}})
        if (candidate) return res.status(400).json({message: 'User already exist'})
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await User.create({login, password: hashPassword})
        const token = jwt.sign({id: newUser.id, login: newUser.login}, 'secret_key', {expiresIn: '24h'})

        return res.json({token})
    }
    async login(req, res) {
        const {login, password} = req.body

        const user = await User.findOne({where: {login}})
        if (!user) return res.status(404).json({message: 'User not found'})
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) return res.status(404).json({message: 'Incorrect password'})
        const token = jwt.sign({id: user.id, login: user.login}, 'secret_key', {expiresIn: '24h'})

        return res.json({token})
    }
    async me(req, res) {
        const token = jwt.sign({id: req.user.id, login: req.user.login}, 'secret_key', {expiresIn: '24h'})

        return res.json({token})
    }
}

export default new AuthController()
