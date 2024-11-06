import { db, User } from "./models.js";

// let team = await Team.findOne()

// await team.createTeamImageFront({
//   url: "rangers.png"
// })

// let TLFronts = await TeamImageFront.findAll()
// let TLBacks = await TeamImageBack.findAll()

// console.log(TLFronts)


console.log(await User.findAll())

await db.close();
