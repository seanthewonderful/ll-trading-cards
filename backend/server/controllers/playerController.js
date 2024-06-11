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
    const id = req.session.user.userId;

    const { firstName, lastName, birthMonth, homeTown, recoveryEmail, teamId } = req.body;
    
    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).send({
        success: false,
        message: "Team not found",
      })
    }
    if (team.userId !== id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      })
    }

    const newPlayer = await team.createPlayer({
      firstName,
      lastName,
      birthMonth,
      homeTown,
      recoveryEmail: recoveryEmail || null,
      userId: id
    });
    
    console.log(newPlayer);

    const user = await User.findByPk(id, {
      include: [
        { 
          model: MLBTeam 
        },
        {
          model: Team,
          include: [
            { model: TeamLogo },
            { model: Player },
          ],
        },
    ]
    });

    return res.status(200).send({
      success: true,
      message: "Player added",
      newPlayer: newPlayer,
      user: user
    })
  }
}

export default playerFunctions