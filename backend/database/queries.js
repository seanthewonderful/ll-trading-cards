import { db, User, Team, TeamLogo, Player } from "./models.js";

let players = await Player.findAll({ include: Team })

players.forEach((player) => {
  console.log(player)
})

await db.close();
