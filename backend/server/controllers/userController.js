import { User, MLBTeam, TeamLogo, Team } from "../../database/models.js";
import bcryptjs from "bcryptjs";

const userHandlers = {
  register: async (req, res) => {
    console.log("HIT");
    console.log(req.body);
    const { email, firstName, lastName, password, favTeam } = req.body;

    if (await User.findOne({ where: { email } })) {
      res.status(409).send({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const mlbTeam = await MLBTeam.findOne({ where: { abbreviation: favTeam } });

    let user = await mlbTeam.createUser({
      email,
      firstName,
      lastName,
      password,
    });

    user = await User.findByPk(user.userId, {
      include: {
        model: Team,
        include: [TeamLogo],
      },
    });

    req.session.user = user;

    res.status(200).send({
      success: true,
      message: "User created",
      user: user,
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    let user = await User.scope("withPassword").findOne({ where: { email } });

    if (!user) {
      res.status(401).send({
        success: false,
        message: "User does not exist",
      });
      return;
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    user = await User.findOne({
      where: { email },
      include: {
        model: Team,
        include: [TeamLogo],
      },
    });

    req.session.user = user;

    res.status(200).send({
      success: true,
      message: "User logged in",
      user: user,
    });
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).send({
      success: true,
      message: "User logged out",
    });
  },

  sessionCheck: async (req, res) => {
    console.log("HIT SESSION CHECK");

    if (req.session.user) {
      res.status(200).send({
        success: true,
        message: "User logged in",
        user: req.session.user,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No user logged in",
        user: null,
      });
    }
  },
};

export default userHandlers;
