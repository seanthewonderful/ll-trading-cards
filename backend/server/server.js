import express from 'express'
import session from 'express-session'
import ViteExpress from 'vite-express'
import userFunctions from './controllers/userController.js'
import teamFunctions from './controllers/teamController.js'
import playerFunctions from './controllers/playerController.js'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const PORT = 8411

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use(morgan("dev"));
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

// TEAM ENDPOINTS
app.post('/api/newTeam', teamFunctions.addTeam)
app.get('/api/team/:id', teamFunctions.findTeam)

// TEAM IMAGE ENDPOINTS
app.post('/api/createTeamImage', teamFunctions.addTeamImage)
app.post('/api/createTeamLogoFull', teamFunctions.addTeamLogoFull)
app.post('/api/createTeamLogoIcon', teamFunctions.addTeamLogoIcon)

// PLAYER ENDPOINTS
app.post('/api/newPlayer', teamFunctions.addPlayer)
app.post('/api/createPlayer', playerFunctions.addPlayer)
app.put('/api/editPlayerBasicInfo', playerFunctions.editPlayerBasicInfo)

// PLAYER STATS ENDPOINTS
app.put('/api/editPlayerBattingStats', playerFunctions.editPlayerBattingStats)

// PLAYER IMAGE ENDPOINTS
app.post('/api/createPlayerImageFront', playerFunctions.addPlayerImageFront)
app.post('/api/createPlayerImageBack', playerFunctions.addPlayerImageBack)


ViteExpress.listen(app, PORT, () => console.log(`Take me out to the http://localhost:${PORT} game`))