import { db, User, Team, Player } from "./models.js"

let user = await User.findOne()
await Player.create({
  firstName: "Cristiano",
  lastName: "Ronaldo",
  birthMonth: "December",
  homeTown: "Manila",
  recoveryEmail: "Lk6yA@example.com"
})
let player = await Player.findOne()

// user = await user.createTeam({ name: "Milwaukee Brewers", year: "2024" })

// await Team.create({
//   name: "Milwaukee Brewers",
//   year: "2024",
//   userId: 1
// })

// console.log(await Team.findAll())

console.dir(player.__proto__)
// console.dir(user.__proto__)


await db.close()