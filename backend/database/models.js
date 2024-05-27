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
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "player",
    timestamps: false
  } 
)

export class PlayerTeam extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
PlayerTeam.init(
  {
    userTeamId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    league: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "userTeam",
    timestamps: false
  } 
)

export class BaseballCard extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
BaseballCard.init(
  {
    cardId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "baseballCard",
    timestamps: false
  } 
)

export class Position extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}
Position.init(
  {
    positionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "position",
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
  },
  {
    sequelize: db,
    modelName: "teamLogo",
    timestamps: false
  } 
)

User.belongsTo(MLBTeam, { foreignKey: "favTeam" })
MLBTeam.hasOne(User, { foreignKey: "favTeam" })