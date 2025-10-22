import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import jobRoutes from "./routes/jobs.routes"


dotenv.config()

const app = express()

// Middleware 

app.use(morgan("combined"))
app.use("/api/v1/jobs",jobRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on port ${process.env.PORT}`)
})
