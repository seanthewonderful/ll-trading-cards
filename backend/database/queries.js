import { db, User, Team, TeamLogo, TeamImageBack, TeamImageFront, Player, PlayerImageFront, PlayerImageBack, PlayerBattingStats, PlayerPitchingStats } from "./models.js";

let team = await Team.findOne()

await team.createTeamImageFront({
  url: "rangers.png"
})

let TLFronts = await TeamImageFront.findAll()
let TLBacks = await TeamImageBack.findAll()

console.log(TLFronts)

await db.close();
