import express from "express"
import cors from "cors"
import jobs from "./api/jobs.route.js"
import statuses from "./api/statuses.route.js"
import sources from "./api/sources.route.js"

const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use("/api/v1/jobs", jobs) // specifies main url for data
app.use("/api/v1/statuses", statuses)
app.use("/api/v1/sources", sources)
app.use("*", (req, res) => res.status(404).json({error: "not found"})) // 404

export default app

