import {User, Team, Player, PlayerStats, PlayerImage, TeamLogo, MLBTeam} from '../../database/models.js'

const teamFunctions = {
    addTeam: async (req, res) => {
        const id = req.session.user.userId
        const {name, year, teamPic, logoFull, logoIcon} = req.body

        const user = await User.findByPk(+id)

        const newTeam = await user.createUserTeam({
            name: name,
            year: year
        })

        const teamPhotos = await Promise.all([teamPic, logoFull, logoIcon].map((el) => {
            const newPhoto = newTeam.createTeamLogo({url: el.url, descriptor: el.descriptor})

            return newPhoto
        }))

        req.session.teamId = newTeam.teamId

        res.status(200).send({
            success: true,
            message: 'Team created',
            newTeam: newTeam,
            teamPhotos: teamPhotos
        })

        // POSTMAN SYNTAX
        // {
        //     "name":"Baughs Burgers",
        //     "year": "2024",
        //     "teamPic": {
        //         "url":"teamPic.jpg",
        //         "descriptor": "Team Picture"
        //     },
        //     "logoFull": {
        //     "url":"fullLogo.jpg",
        //     "descriptor": "Full Logo"
        //     },
        //     "logoIcon": {
        //     "url":"teamIcon.jpg",
        //     "descriptor": "Team Picture"
        //     }
        // }

        // JSON RESPONSE
        // {
        //     "success": true,
        //     "message": "Team created",
        //     "newTeam": {
        //         "teamId": 3,
        //         "name": "Baughs Burgers",
        //         "year": "2024",
        //         "userId": 1
        //     },
        //     "teamPhotos": [
        //         {
        //             "teamLogoId": 31,
        //             "url": "teamPic.jpg",
        //             "descriptor": "Team Picture",
        //             "teamId": 3
        //         },
        //         {
        //             "teamLogoId": 32,
        //             "url": "fullLogo.jpg",
        //             "descriptor": "Full Logo",
        //             "teamId": 3
        //         },
        //         {
        //             "teamLogoId": 33,
        //             "url": "teamIcon.jpg",
        //             "descriptor": "Team Picture",
        //             "teamId": 3
        //         }
        //     ]
        // }

    },

    findTeam: async (req, res) => {
        console.log(req.params)

        const foundTeam = await Team.findByPk(req.params.id)
        console.log('foundTeam', foundTeam)

        req.session.teamId = foundTeam.teamId

        res.status(200).send({
            success: true,
            message: 'Team found!'
        })
    },

    addPlayer: async (req, res) => {
        // Function creates Player object and then creates the PlayerImage object

        let id = req.session.teamId
        let playerData = req.body

        const foundTeam = await Team.findByPk(id)

        console.log(foundTeam)

        const newPlayer = await foundTeam.createPlayer({
            firstName: playerData.firstName,
            lastName: playerData.lastName,
            birthMonth: playerData.birthMonth,
            homeTown: playerData.homeTown,
            recoveryEmail: playerData.recoveryEmail,
            userId: req.session.user.userId
        })

        const playerImage = await newPlayer.createPlayerImage({
            url: playerData.imgUrl,
            year: playerData.year
        })

        res.status(200).send({
            success: true,
            message: 'Player created!',
            newPlayer: newPlayer,
            playerImage: playerImage
        })

        // POSTMAN SYNTAX
        // {
        //     "firstName": "Kyle",
        //     "lastName": "Baugh",
        //     "birthMonth": "June",
        //     "homeTown": "Lehi",
        //     "recoveryEmail": "kyle@kyle.com",
        //     "imgUrl": "player.jpg",
        //     "year":"2024"
        // }

        // JSON RESPONSE
        // {
        //     "success": true,
        //     "message": "Player created!",
        //     "newPlayer": {
        //         "playerId": 7,
        //         "firstName": "Kyle",
        //         "lastName": "Baugh",
        //         "birthMonth": "June",
        //         "homeTown": "Lehi",
        //         "recoveryEmail": "kyle@kyle.com",
        //         "userId": 1
        //     },
        //     "playerImage": {
        //         "playerImageId": 2,
        //         "url": "player.jpg",
        //         "year": "2024",
        //         "playerId": 7
        //     }
        // }
    }
}

export default teamFunctions