import {
  db,
  User,
  Team,
  TeamImage,
  TeamLogoFull,
  TeamLogoIcon,
  Player,
  PlayerImageFront,
  PlayerImageBack,
  PlayerBattingStats,
  PlayerPitchingStats
} from "./models.js";


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

export async function upsertTeamImage(imgUrl, teamId) {
  return await TeamImage
    .findOne({
      where: {
        teamId
      }
    })
    .then((teamImage) => {
      if (teamImage) {
        return teamImage.update({
          url: imgUrl
        })
      } else {
        return TeamImage.create({
          url: imgUrl,
          teamId
        })
      }
    })
}

export async function upsertTeamLogoFull(imgUrl, teamId) {
  return await TeamLogoFull
    .findOne({
      where: {
        teamId
      }
    })
    .then((teamLogoFull) => {
      if (teamLogoFull) {
        return teamLogoFull.update({
          url: imgUrl
        })
      } else {
        return TeamLogoFull.create({
          url: imgUrl,
          teamId
        })
      }
    })
}

export async function upsertTeamLogoIcon(imgUrl, teamId) {
  return await TeamLogoIcon
    .findOne({
      where: {
        teamId
      }
    })
    .then((teamLogoIcon) => {
      if (teamLogoIcon) {
        return teamLogoIcon.update({
          url: imgUrl
        })
      } else {
        return TeamLogoIcon.create({
          url: imgUrl,
          teamId
        })
      }
    })
}