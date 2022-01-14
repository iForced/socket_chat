import {Router} from "express";
import MessageController from '../controllers/messageController.js'

const router = Router()

router.post('/add', MessageController.add)
router.get('/', MessageController.getAll)
router.get('/:userId', MessageController.getByUserId)


export default router