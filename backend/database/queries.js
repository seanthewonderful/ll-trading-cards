import { db, User } from "./models.js"

console.log(await User.findAll())

await db.close()