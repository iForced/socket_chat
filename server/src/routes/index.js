import { Router } from 'express'
import authRouter from './authRouter.js'
import messageRouter from './messageRouter.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/messages', messageRouter)

export default router