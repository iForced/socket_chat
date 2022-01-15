import {Router} from "express";
import UsersController from '../controllers/usersController.js'

const router = Router()

router.get('/', UsersController.getAll)


export default router