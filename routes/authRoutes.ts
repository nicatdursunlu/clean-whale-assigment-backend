import { body } from 'express-validator'
import { Router } from 'express'

import * as authController from '../controllers/authController'

const router: Router = Router()

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  authController.register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  authController.login
)

export default router
