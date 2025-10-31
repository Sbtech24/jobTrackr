import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { initDb } from "./config/initDb"
import jobRoutes from "./routes/jobs.routes"


dotenv.config()

const app = express()

app.use(express.json())



// Middleware 
app.use(express.json())
app.use(morgan("combined"))
app.use("/api/v1/jobs",jobRoutes)

app.listen(process.env.PORT, async ()=>{
    await initDb()
    console.log(`Server is Running on port ${process.env.PORT}`)
})
