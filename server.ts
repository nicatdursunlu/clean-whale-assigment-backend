import express, { Application } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/authRoutes'
import errorMiddleware from './middleware/error'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Middleware
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

app.use(errorMiddleware)

const MONGODB_URI = process.env.MONGODB_URI as string
if (!MONGODB_URI) {
  console.error('MongoDB connection string is missing in environment variables')
  process.exit(1)
}

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err))
