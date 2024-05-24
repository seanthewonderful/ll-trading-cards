import { db, User } from "./models.js";

await db.sync({ force: true });

await User.create({
  email: "t",
  firstName: "Timmy",
  lastName: "Two-Base",
  password: "asdf",
});

await User.create({
  email: "s",
  firstName: "Billy",
  lastName: "Base-on-Balls",
  password: "asdf",
});

await db.close()