import { db, User, Team, TeamLogo, Player, PlayerImage } from "./models.js";

let players = await Player.findAll({ include: PlayerImage })

players.forEach((player) => {
  console.log(player)
})

await db.close();
