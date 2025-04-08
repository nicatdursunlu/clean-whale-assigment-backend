import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET || ''

interface LoginRequest {
  email: string
  password: string
}

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log('register', req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '30m',
    })

    res.json({ token, user: { email: user.email } })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
