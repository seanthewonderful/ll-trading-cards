import { db, User, Team, TeamLogo, Player } from "./models.js";

let user = await User.findOne();
let team = await Team.findByPk(1, { include: [TeamLogo] });

console.log(team);

let logos = await TeamLogo.findAll();

console.log(logos);

await db.close();
