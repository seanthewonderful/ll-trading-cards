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