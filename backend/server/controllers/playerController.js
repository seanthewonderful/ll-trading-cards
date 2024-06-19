import {
  User,
  Team,
  Player,
  PlayerStats,
  PlayerImage,
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
        { 
          model: MLBTeam 
        },
        {
          model: Team,
          include: [
            { model: TeamLogo },
            { model: Player,
              include: [
                { model: PlayerImage },
                { model: PlayerStats }
              ]
            },
          ],
        },
    ]
    });

    team = await Team.findByPk(teamId, {
      include: [
        {
          model: TeamLogo
        },
        {
          model: Player,
          include: [
            { model: PlayerImage },
            { model: PlayerStats }
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
  }
}

export default playerFunctions