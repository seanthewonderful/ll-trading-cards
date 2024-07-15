import { db, User, Team, TeamLogo, TeamImageBack, TeamImageFront, Player, PlayerImageFront, PlayerImageBack, PlayerBattingStats, PlayerPitchingStats } from "./models.js";


const team = await Team.findOne({
  include: [
    { model: TeamLogo },
    { model: TeamImageFront },
    { model: TeamImageBack },
    {
      model: Player,
      include: [
        { model: PlayerImageFront },
        { model: PlayerImageBack },
        { model: PlayerBattingStats },
        { model: PlayerPitchingStats }
      ]
    }
  ]
})
console.log(team)

// let battingStats = await PlayerBattingStats.findOne({
//   where: {
//     playerId: 1
//   }
// })

// console.log(battingStats)
// battingStats = await battingStats.update(
//   {
//     G: 10,
//     AB: 15,
//     AVG: .333,
//     HR: 6,
//     RBI: 20,
//     SB: 0,
//     R: 0,
//     OBP: 0,
//     SLG: 0,
//     OPS: 0,
//     H: 6,
//     '2B': 2,
//     '3B': 0,
//     BB: 1,
//     HBP: 0,
//     SO: 1,
//     playerId: 1
//   },
//   // { where: { playerId: 1 } },
// );
// console.log(battingStats);

// let player = await Player.findByPk(1, {
//   include: [
//     { model: PlayerBattingStats },
//     { model: PlayerPitchingStats }
//   ]
// })

// console.log('player: ',player)

// console.log("battingStats: ", await PlayerBattingStats.findAll())

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
