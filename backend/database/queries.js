import { db, User, Team, TeamLogo, Player, PlayerImageFront, PlayerImageBack } from "./models.js";

let player = await Player.findOne()

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

player = await Player.findByPk(1, {
  include: [
    { model: PlayerImageFront },
    { model: PlayerImageBack }
  ]
})

// await PlayerImageBack.create({
//   url: "playerImageBack2",
//   playerId: 1
// })

// await PlayerImageBack.destroy({
//   where: {
//     playerId: 1
//   }
// })

console.log(await PlayerImageFront.findAll())

await db.close();
