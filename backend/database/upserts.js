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
          url: imgUrl
        })
      } else {
        return PlayerImageBack.create({
          url: imgUrl,
          playerId
        })
      }
    })
}

export async function upsertTeamImgFront(imgUrl, teamId) {
  return await TeamImageFront
    .findOne({
      where: {
        teamId
      }
    })
    .then((teamImageFront) => {
      if (teamImageFront) {
        return teamImageFront.update({
          url: imgUrl
        })
      } else {
        return TeamImageFront.create({
          url: imgUrl,
          teamId
        })
      }
    })
}

export async function upsertTeamImgBack(imgUrl, teamId) {
  return await TeamImageBack
    .findOne({
      where: {
        teamId
      }
    })
    .then((teamImageBack) => {
      if (teamImageBack) {
        return teamImageBack.update({
          url: imgUrl
        })
      } else {
        return TeamImageBack.create({
          url: imgUrl,
          teamId
        })
      }
    })
}