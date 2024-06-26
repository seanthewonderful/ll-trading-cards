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
User.init(
  {
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
  },
  {
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
  }
)

export class Player extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
Player.init(
  {
    playerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthMonth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeTown: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recoveryEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: db,
    modelName: "player",
    timestamps: false
  } 
)

export class Team extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
Team.init(
  {
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
  },
  {
    sequelize: db,
    modelName: "userTeam",
    timestamps: false
  } 
)

export class MLBTeam extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
MLBTeam.init(
  {
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
  },
  {
    sequelize: db,
    modelName: "mlbTeam",
    timestamps: false
  } 
)

export class TeamLogo extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
TeamLogo.init(
  {
    teamLogoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptor: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: db,
    modelName: "teamLogo",
    timestamps: false
  } 
)

export class PlayerImage extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
PlayerImage.init(
  {
    playerImageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "playerImage",
    timestamps: false
  } 
)

export class PlayerStats extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
PlayerStats.init(
  {
    playerStatsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    position1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jerseyNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    G: {
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
      type: DataTypes.DECIMAL(5, 3),
      allowNull: true,
    },
    OBP: {
      type: DataTypes.DECIMAL(5, 3),
      allowNull: true,
    },
    OPS: {
      type: DataTypes.DECIMAL(5, 3),
      allowNull: true,
    },
    AVG: {
      type: DataTypes.DECIMAL(5, 3),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "playerStats",
    timestamps: false
  } 
)

User.belongsTo(MLBTeam, { foreignKey: "favTeam" })
MLBTeam.hasOne(User, { foreignKey: "favTeam" })

User.hasMany(Player, { foreignKey: "userId" })
Player.belongsTo(User, { foreignKey: "userId" })

User.hasMany(Team, { foreignKey: "userId" })
Team.belongsTo(User, { foreignKey: "userId" })

Player.belongsToMany(Team, { through: "PlayerTeam" })
Team.belongsToMany(Player, { through: "PlayerTeam" })

Player.hasMany(PlayerImage, { foreignKey: "playerId" })
PlayerImage.belongsTo(Player, { foreignKey: "playerId" })

Player.hasMany(PlayerStats, { foreignKey: "playerId" })
PlayerStats.belongsTo(Player, { foreignKey: "playerId" })

Team.hasMany(TeamLogo, { foreignKey: "teamId" })
TeamLogo.belongsTo(Team, { foreignKey: "teamId" })