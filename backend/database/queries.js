import { db, User, Team, TeamLogo, Player } from "./models.js";

let team = await Team.findByPk(4)

await team.createPlayer({
  firstName: "test",
  lastName: "test",
  birthMonth: "test",
  homeTown: "test",
  recoveryEmail: "test",
  userId: 1
})

console.log(await Team.findByPk(4, { include: [Player] }));

await db.close();
