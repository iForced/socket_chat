import { Router } from 'express'
import authRouter from './authRouter.js'
import messageRouter from './messageRouter.js'
import usersRouter from './usersRouter.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/messages', messageRouter)
router.use('/users', usersRouter)

export default router