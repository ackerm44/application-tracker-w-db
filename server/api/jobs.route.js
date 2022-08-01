import express from "express"
import JobsCtrl from "./jobs.controller.js"

const router = express.Router()

router
    .route("/")
    .get(JobsCtrl.apiGetJobs)
    .post(JobsCtrl.apiPostJob)
    .put(JobsCtrl.apiUpdateJob)
    .delete(JobsCtrl.apiDeleteJob)

router.route("/id/:id").get(JobsCtrl.apiGetJobById)


export default router 