import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { initDb } from "./models/initDb"
import jobRoutes from "./routes/jobs.routes"
import userRoutes from "./routes/users.routes"
import { initUserTable } from "./models/initUserTableDb"
import cookieParser from "cookie-parser"




dotenv.config()

const app = express()

app.use(express.json())



// Middleware 
app.use(express.json())
app.use(morgan("combined"))

// middleware for cookies
app.use(cookieParser())

// Routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/jobs",jobRoutes)

app.listen(process.env.PORT, async ()=>{
    await initDb()
    await initUserTable()
    console.log(`Server is Running on port ${process.env.PORT}`)
})
