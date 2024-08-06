import {
  DataTypes,
  Model
} from 'sequelize'
import connectToDB from "./db.js";
import util from "util";
import bcryptjs from "bcryptjs";

export const db = await connectToDB("postgresql:///ll-baseball-cards");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "user",
  timestamps: false,
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  },
  scopes: {
    withPassword: {
      attributes: {
        include: ['password']
      }
    }
  },
  hooks: {
    beforeCreate: (user, options) => {
      const hashedPassword = bcryptjs.hashSync(
        user.password,
        bcryptjs.genSaltSync(5)
      );
      user.password = hashedPassword;
      user.firstName = user.firstName.toLowerCase();
      user.lastName = user.lastName.toLowerCase();
    },
    beforeBulkCreate: (users, options) => {
      for (let user of users) {
        const hashedPassword = bcryptjs.hashSync(
          user.password,
          bcryptjs.genSaltSync(5)
        );
        user.password = hashedPassword;
        user.firstName = user.firstName.toLowerCase();
        user.lastName = user.lastName.toLowerCase();
      }
    }
  }
})

export class Player extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
Player.init({
  playerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  birthMonth: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  homeTown: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  homeCountry: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  homeState: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  jerseyNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bats: {
    type: DataTypes.STRING(1),
    allowNull: false,
    defaultValue: "R",
  },
  throws: {
    type: DataTypes.STRING(1),
    allowNull: false,
    defaultValue: "R",
  },
  position1: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  position2: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  recoveryEmail: {
    type: DataTypes.STRING(60),
    allowNull: true,
  }
}, {
  sequelize: db,
  modelName: "player",
  timestamps: false
})

export class PlayerBattingStats extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
PlayerBattingStats.init({
  playerBattingStatsId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  G: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  PA: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  AB: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  R: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  H: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  '2B': {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  '3B': {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  HR: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  RBI: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  SB: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  BB: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  SLG: {
    // type: DataTypes.DECIMAL(5, 3),
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  OBP: {
    // type: DataTypes.DECIMAL(5, 3),
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  OPS: {
    // type: DataTypes.DECIMAL(5, 3),
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  AVG: {
    // type: DataTypes.DECIMAL(5, 3),
    type: DataTypes.STRING(3),
    allowNull: true,
  },
}, {
  sequelize: db,
  modelName: "playerBattingStats",
  timestamps: false
})

export class PlayerPitchingStats extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
PlayerPitchingStats.init({
  playerPitchingStatsId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  W: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  L: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  S: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  IP: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  H: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  R: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ER: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  BB: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  HBP: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  K: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ERA: {
    type: DataTypes.DECIMAL(5, 3),
    allowNull: true,
  }
}, {
  sequelize: db,
  modelName: "playerPitchingStats",
  timestamps: false
})

export class PlayerImageFront extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
PlayerImageFront.init({
  playerImageFrontId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // playerId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   unique: true,
  // }
}, {
  sequelize: db,
  modelName: "playerImageFront",
  timestamps: false
})

export class PlayerImageBack extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
PlayerImageBack.init({
  playerImageBackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // playerId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   unique: true,
  // }
}, {
  sequelize: db,
  modelName: "playerImageBack",
  timestamps: false
})

export class Team extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
Team.init({
  teamId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING(4),
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: "userTeam",
  timestamps: false
})

export class TeamImage extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
TeamImage.init({
  teamImageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "teamImage",
  timestamps: false
})

// export class TeamImageBack extends Model {
//   [util.inspect.custom]() {
//     return this.toJSON()
//   }
// }
// TeamImageBack.init(
//   {
//     teamImageBackId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     url: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: db,
//     modelName: "teamImageBack",
//     timestamps: false
//   } 
// )

export class TeamLogoFull extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
TeamLogoFull.init({
  teamLogoFullId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "teamLogoFull",
  timestamps: false
})

export class TeamLogoIcon extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
TeamLogoIcon.init({
  teamLogoIconId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "teamLogoIcon",
  timestamps: false
})

export class MLBTeam extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
MLBTeam.init({
  teamId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abbreviation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "mlbTeam",
  timestamps: false
})


// Associations

// User - MLBTeam
User.belongsTo(MLBTeam, {
  foreignKey: "favTeam"
})
MLBTeam.hasOne(User, {
  foreignKey: "favTeam"
})

// User - Team
User.hasMany(Team, {
  foreignKey: "userId"
})
Team.belongsTo(User, {
  foreignKey: "userId"
})

// User - Player
// User.hasMany(Player, {
//   foreignKey: "userId"
// })
// Player.belongsTo(User, {
//   foreignKey: "userId"
// })

// Team - Player
Team.hasMany(Player, {
  foreignKey: "teamId"
})
Player.belongsTo(Team, {
  foreignKey: "teamId"
})

// Team - TeamImage
Team.hasOne(TeamImage, {
  foreignKey: "teamId"
})
TeamImage.belongsTo(Team, {
  foreignKey: "teamId"
})

// Team - TeamLogo
Team.hasOne(TeamLogoFull, {
  foreignKey: "teamId"
})
TeamLogoFull.belongsTo(Team, {
  foreignKey: "teamId"
})

// Team - TeamLogo
Team.hasOne(TeamLogoIcon, {
  foreignKey: "teamId"
})
TeamLogoIcon.belongsTo(Team, {
  foreignKey: "teamId"
})

// Team.hasOne(TeamImageBack, {
//   foreignKey: "teamId"
// })
// TeamImageBack.belongsTo(Team, {
//   foreignKey: "teamId"
// })

// Player - PlayerImageFront
Player.hasOne(PlayerImageFront, {
  foreignKey: "playerId"
})
PlayerImageFront.belongsTo(Player, {
  foreignKey: "playerId"
})

// Player - PlayerImageBack
Player.hasOne(PlayerImageBack, {
  foreignKey: "playerId"
})
PlayerImageBack.belongsTo(Player, {
  foreignKey: "playerId"
})

// Player - PlayerBattingStats
Player.hasOne(PlayerBattingStats, {
  foreignKey: "playerId"
})
PlayerBattingStats.belongsTo(Player, {
  foreignKey: "playerId"
})

// Player - PlayerPitchingStats
Player.hasOne(PlayerPitchingStats, {
  foreignKey: "playerId"
})
PlayerPitchingStats.belongsTo(Player, {
  foreignKey: "playerId"
})