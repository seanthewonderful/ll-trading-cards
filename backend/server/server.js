import express from 'express'
import session from 'express-session'
import ViteExpress from 'vite-express'
import userFunctions from './controllers/userController.js'
import cors from 'cors'

const app = express()
const PORT = 8411

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

const sessionMiddleware = session({
  secret: 'theOneRing',
  saveUninitialized: false,
  resave: false
})

app.use(sessionMiddleware)

app.use(express.static('src'))

// AUTH ENDPOINTS
app.post('/api/register', (userFunctions.register))
app.post('/api/login', (userFunctions.login))
app.post('/api/logout', (userFunctions.logout))
app.get('/api/sessionCheck', (userFunctions.sessionCheck))

ViteExpress.listen(app, PORT, () => console.log(`Take me out to the http://localhost:${PORT}`))