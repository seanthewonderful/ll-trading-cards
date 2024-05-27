import { db, User, Position } from "./models.js"

console.log(await Position.findAll())

await db.close()