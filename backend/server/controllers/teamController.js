import {
  User,
  Team,
  Player,
  PlayerBattingStats,
  PlayerPitchingStats,
  PlayerImageFront,
  PlayerImageBack,
  TeamLogo,
  MLBTeam,
  TeamImageFront,
  TeamImageBack,
} from "../../database/models.js";
import { 
  upsertTeamImgFront, 
  upsertTeamImgBack 
} from "../../database/upserts.js";

const teamFunctions = {
  addTeam: async (req, res) => {
    const id = req.session.user.userId;
    const { name, year, teamPic, teamImgFront, teamImgBack, logoFull, logoIcon } = req.body;

    let user = await User.findByPk(+id);

    let newTeam = await user.createUserTeam({
      name: name,
      year: year,
    });

    const teamPhotos = await Promise.all(
      [teamPic, logoFull, logoIcon].map((el) => {
        const newPhoto = newTeam.createTeamLogo({
          url: el.url,
          descriptor: el.descriptor,
        });

        return newPhoto;
      })
    );

    await newTeam.createTeamImageFront({
      url: teamImgFront,
    });

    await newTeam.createTeamImageBack({
      url: teamImgBack,
    })

    user = await User.findByPk(+id, {
      include: [
        { 
          model: MLBTeam 
        },
        {
          model: Team,
          include: [
            { model: TeamLogo },
            { model: TeamImageFront },
            { model: TeamImageBack },
            { model: Player,
              include: [
                { model: PlayerImageFront },
                { model: PlayerImageBack },
                { model: PlayerBattingStats },
                { model: PlayerPitchingStats }
              ]
            },
          ],
        },
      ]
    });

    req.session.teamId = newTeam.teamId;

    res.status(200).send({
      success: true,
      message: "Team created",
      user: user,
      // newTeam: newTeam,
      // teamPhotos: teamPhotos,
    });

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
    console.log(req.params);

    try {
      const foundTeam = await Team.findByPk(+req.params.id, {
        include: [
          { model: TeamLogo },
          { model: TeamImageFront },
          { model: TeamImageBack },
          { model: Player,
            include: [
              { model: PlayerImageFront },
              { model: PlayerImageBack },
              { model: PlayerBattingStats },
              { model: PlayerPitchingStats }
            ]
          },
        ]
      });
      console.log("foundTeam", foundTeam);

      req.session.teamId = foundTeam.teamId;

      return res.status(200).send({
        success: true,
        message: "Team found!",
        team: foundTeam
      });

    } catch (err) {
      console.log(err);
      return res.status(404).send({
        success: false,
        message: "Team not found",
      })
    }
  },

  addPlayer: async (req, res) => {
    // Function creates Player object and then creates the PlayerImage object

    let id = req.session.teamId;
    let playerData = req.body;

    const foundTeam = await Team.findByPk(id);

    console.log(foundTeam);

    const newPlayer = await foundTeam.createPlayer({
      firstName: playerData.firstName,
      lastName: playerData.lastName,
      birthMonth: playerData.birthMonth,
      homeTown: playerData.homeTown,
      recoveryEmail: playerData.recoveryEmail,
      userId: req.session.user.userId,
    });

    res.status(200).send({
      success: true,
      message: "Player created!",
      newPlayer: newPlayer,
    });

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
  },

  addTeamImageFront: async (req, res) => {
    // Function creates TeamImage object

    const { imgUrl, teamId } = req.body;
    // Check if user is logged in
    if (!await User.findByPk(req.session.user.userId)) {
      return res.status(401).send({
        success: false,
        message: "You must be logged in to add a team image",
      })
    }

    try {
      await upsertTeamImgFront(imgUrl, teamId);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Error adding team image front: " + err,
      })
    }

    const team = await Team.findByPk(teamId, {
      include: [
        { model: TeamLogo },
        { model: TeamImageFront },
        { model: TeamImageBack },
        { model: Player,
          include: [
            { model: PlayerImageFront },
            { model: PlayerImageBack },
            { model: PlayerBattingStats },
            { model: PlayerPitchingStats }
          ]
        },
      ],
    });

    const user = await User.findByPk(req.session.user.userId, {
      include: [
        { 
          model: MLBTeam 
        },
        {
          model: Team,
          include: [
            { model: TeamLogo },
            { model: TeamImageFront },
            { model: TeamImageBack },
            { model: Player,
              include: [
                { model: PlayerImageFront },
                { model: PlayerImageBack },
                { model: PlayerBattingStats },
                { model: PlayerPitchingStats }
              ]
            },
          ],
        },
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Team image front added!",
      team: team,
      user: user
    });
  },

  addTeamImageBack: async (req, res) => {
    // Function creates TeamImage object 

    const { imgUrl, teamId } = req.body;
    // Check if user is logged in
    if (!await User.findByPk(req.session.user.userId)) {
      return res.status(401).send({
        success: false,
        message: "You must be logged in to add a team image",
      })
    }

    try {
      await upsertTeamImgBack(imgUrl, teamId);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Error adding team image back: " + err,
      })
    }

    const team = await Team.findByPk(teamId, {
      include: [
        { model: TeamLogo },
        { model: TeamImageFront },
        { model: TeamImageBack },
        { model: Player,
          include: [
            { model: PlayerImageFront },
            { model: PlayerImageBack },
            { model: PlayerBattingStats },
            { model: PlayerPitchingStats }
          ]
        },
      ],
    });

    const user = await User.findByPk(req.session.user.userId, {
      include: [
        { 
          model: MLBTeam 
        },
        {
          model: Team,
          include: [
            { model: TeamLogo },
            { model: TeamImageFront },
            { model: TeamImageBack },
            { model: Player,
              include: [
                { model: PlayerImageFront },
                { model: PlayerImageBack },
                { model: PlayerBattingStats },
                { model: PlayerPitchingStats }
              ]
            },
          ],
        },
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Team image back added!",
      team: team,
      user: user
    });
  }
};

export default teamFunctions;
