import {
  User,
  Team,
  TeamImageFront,
  TeamImageBack,
  Player,
  PlayerBattingStats,
  PlayerPitchingStats,
  PlayerImageFront,
  PlayerImageBack,
  TeamLogo,
  MLBTeam,
} from "../../database/models.js";

const playerFunctions = {

  addPlayer: async (req, res) => {
    const sessionUserId = req.session.user.userId;

    const { 
      firstName, 
      lastName, 
      birthMonth, 
      homeTown, 
      homeCountry,
      homeState,
      recoveryEmail, 
      teamId 
    } = req.body;
    
    let team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).send({
        success: false,
        message: "Team not found",
      })
    }
    if (team.userId !== sessionUserId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      })
    }

    const newPlayer = await team.createPlayer({
      firstName,
      lastName,
      birthMonth: +birthMonth || null,
      homeTown: homeTown || null,
      homeCountry: homeCountry || null,
      homeState: homeState || null,
      recoveryEmail: recoveryEmail || null,
      userId: sessionUserId
    });
    
    console.log(newPlayer);

    const user = await User.findByPk(sessionUserId, {
      include: [
        { model: MLBTeam },
        {
          model: Team,
          include: [
            { model: TeamLogo },
            { model: TeamImageFront },
            { model: TeamImageBack },
            { 
              model: Player,
              include: [
                { model: PlayerImageFront },
                { model: PlayerImageBack },
                { model: PlayerBattingStats },
                { model: PlayerPitchingStats },
              ]
            }
          ],
        },
      ],
    });

    team = await Team.findByPk(teamId, {
      include: [
        { model: TeamLogo },
        { model: TeamImageFront },
        { model: TeamImageBack },
        {
          model: Player,
          include: [
            { model: PlayerImageFront },
            { model: PlayerImageBack },
            { model: PlayerBattingStats },
            { model: PlayerPitchingStats }
          ]
        }
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Player added",
      newPlayer: newPlayer,
      user: user,
      team: team
    })
  },

  updatePlayer: async (req, res) => {
    const { playerId, teamId, playerInfo } = req.body;
    let updatedPlayer;
    let team;
    try {
      updatedPlayer = await Player.update(playerInfo, {
        where: {
          playerId
        }
      });
    } catch(err) {
      return res.status(500).send({
        success: false,
        message: `Error grabbing player from db: ${err}`
      })
    }

    try {
      team = await Team.findByPk(teamId, {
        include: [
          { model: TeamLogo },
          { model: TeamImageFront },
          { model: TeamImageBack },
          {
            model: Player,
            include: [
              { model: PlayerImageFront },
              { model: PlayerImageBack },
              { model: PlayerBattingStats },
              { model: PlayerPitchingStats },
            ]
          }
        ]
      });
    } catch(err) {
      return res.status(500).send({
        success: false,
        message: `Error grabbing team from db: ${err}`
      })
    }

    return res.status(200).send({
      success: true,
      message: "Player updated",
      updatedPlayer,
      team
    })
  },

  editPlayerBattingStats: async (req, res) => {
    const { playerId, stats } = req.body;
    // query for PlayerBattingStats where playerId
    let playerBattingStats = await PlayerBattingStats.findOne({
      where: {
        playerId
      }
    })
    // if exists, update
    if (playerBattingStats) {
      playerBattingStats = await playerBattingStats.update(stats);
    } else {
      // if not exists, create new PlayerBattingStats
      playerBattingStats =await PlayerBattingStats.create(stats);
    }

    const team = await Team.findByPk(stats.teamId, {
      include: [
        { model: TeamLogo },
        { model: TeamImageFront },
        { model: TeamImageBack },
        {
          model: Player,
          include: [
            { model: PlayerImageFront },
            { model: PlayerImageBack },
            { model: PlayerBattingStats },
            { model: PlayerPitchingStats },
          ]
        }
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Player batting stats added",
      playerBattingStats,
      team
    })
  },

  addPlayerImageFront: async (req, res) => {
    const { playerId, imgUrl } = req.body;

    try {
      await PlayerImageFront.upsert({
        url: imgUrl,
        playerId
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: err,
      })
    }

    const player = await Player.findByPk(playerId, {
      include: [
        { model: PlayerImageFront },
        { model: PlayerImageBack },
        { model: PlayerBattingStats },
        { model: PlayerPitchingStats }
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Player image added",
      player: player
    })
  },

  updatePlayerImageFront: async (req, res) => {
    const { playerId, imgUrl } = req.body;

    try {
      await PlayerImageFront.upsert({
        url: imgUrl,
        playerId
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: err,
      })
    }

    const player = await Player.findByPk(playerId, {
      include: [
        { model: PlayerImageFront },
        { model: PlayerImageBack },
        { model: PlayerBattingStats },
        { model: PlayerPitchingStats },
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Player image updated",
      player: player
    })
  },

  addPlayerImageBack: async (req, res) => {
    const { playerId, imgUrl } = req.body;

    try {
      await PlayerImageBack.upsert({
        url: imgUrl,
        playerId
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: err,
      })
    }

    const player = await Player.findByPk(playerId, {
      include: [
        { model: PlayerImageBack },
        { model: PlayerImageBack },
        { model: PlayerBattingStats },
        { model: PlayerPitchingStats },
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Player image added",
      player: player
    })
  }, 

  updatePlayerImageBack: async (req, res) => {
    const { playerId, imgUrl } = req.body;

    try {
      await PlayerImageBack.upsert({
        url: imgUrl,
        playerId
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: err,
      })
    }

    const player = await Player.findByPk(playerId, {
      include: [
        { model: PlayerImageBack },
        { model: PlayerImageBack },
        { model: PlayerBattingStats },
        { model: PlayerPitchingStats },
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Player image updated",
      player: player
    })
  }
}

export default playerFunctions