import { Router } from 'express'
import authRouter from './authRouter.js'
import messageRouter from './messageRouter.js'
import usersRouter from './usersRouter.js'
import conversationRouter from './conversationRouter.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/messages', messageRouter)
router.use('/users', usersRouter)
router.use('/conversations', conversationRouter)

export default router