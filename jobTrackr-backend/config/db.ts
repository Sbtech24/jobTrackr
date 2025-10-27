import dotenv from "dotenv"
import {Client} from "pg"

dotenv.config()

 const conn = new Client({
 user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'jobTrackr',
})

await conn.connect()

export {conn}