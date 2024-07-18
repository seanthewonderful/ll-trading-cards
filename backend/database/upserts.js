import { db, User, Team, TeamLogo, TeamImageBack, TeamImageFront, Player, PlayerImageFront, PlayerImageBack, PlayerBattingStats, PlayerPitchingStats } from "./models.js";


// Add logic to delete image from S3 bucket if prior image exists?
export async function upsertPlayerImgFront(imgUrl, playerId) {
  return await PlayerImageFront
    .findOne({
      where: {
        playerId
      }
    })
    .then((playerImageFront) => {
      // console.log(`imgUrl: ${imgUrl}`)
      // console.log(`playerId: ${playerId}`)
      console.log(`playerImageFront: ${playerImageFront}`)
      if (playerImageFront) {
        return playerImageFront.update({
          url: imgUrl
        })
      } else {
        return PlayerImageFront.create({
          url: imgUrl,
          playerId
        })
      }
    })
}

export async function upsertPlayerImgBack(imgUrl, playerId) {
  return await PlayerImageBack
    .findOne({
      where: {
        playerId
      }
    })
    .then((playerImageBack) => {
      if (playerImageBack) {
        return playerImageBack.update({
          imgUrl
        })
      } else {
        return PlayerImageBack.create({
          imgUrl,
          playerId
        })
      }
    })
}