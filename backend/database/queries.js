import { db, User, Team, TeamLogo, TeamImageBack, TeamImageFront, Player, PlayerImageFront, PlayerImageBack, PlayerBattingStats, PlayerPitchingStats } from "./models.js";


let images = await PlayerImageBack.findAll()
let frimages = await PlayerImageFront.findAll()

console.log("images: ", images)
console.log("frimages: ", frimages)

// let playerImageBack = await player.createPlayerImageBack({
//   url: "playerImageBack3",
// })

// await Player.create({
//   name: "Player 1",
//   userId: 1,
//   firstName: "Player",
//   lastName: "1",
//   bats: "R",
//   throws: "R",
// })


// await player.createPlayerImageBack({
//   url: "playerImageBack3",
// })

// await PlayerImageFront.upsert({
//   url: "playerImageFront2",
//   playerId: 1
// })

// await PlayerImageBack.create({
//   url: "playerImageBack2",
//   playerId: 1
// })

// await PlayerImageBack.destroy({
//   where: {
//     playerId: 1
//   }
// })


await db.close();
