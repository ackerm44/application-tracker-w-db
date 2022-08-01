import JobsDAO from "../dao/jobsDAO.js"

export default class JobsController {
  static async apiGetJobs(req, res, next) {
    const jobsPerPage = req.query.jobsPerPage ? parseInt(req.query.jobsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.status) {
      filters.status = req.query.status
    } else if (req.query.company) {
      filters.company = req.query.company
    }

    const { jobsList, totalNumJobs } = await JobsDAO.getJobs({
      filters,
      page,
      jobsPerPage,
    })

    let response = {
      jobs: jobsList,
      page: page,
      filters: filters,
      entries_per_page: jobsPerPage,
      total_results: totalNumJobs,
    }
    res.json(response)
  }
  static async apiGetJobById(req, res, next) {
    try {
      let id = req.params.id || {}
      let job = await JobsDAO.getJobByID(id)
      if (!job) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(job)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

//   static async apiGetJobCuisines(req, res, next) {
//     try {
//       let cuisines = await JobsDAO.getCuisines()
//       res.json(cuisines)
//     } catch (e) {
//       console.log(`api, ${e}`)
//       res.status(500).json({ error: e })
//     }
//   }

static async apiPostJob(req, res, next) {
    try {
      const JobResponse = await JobsDAO.addJob(req.body)
      res.json({ status: "success"})
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateJob(req, res, next) {
    try {
      const jobId = req.body.job_id
      const text = req.body.text
      const date = new Date()

      const jobResponse = await JobsDAO.updateJob(req.body)

      var { error } = jobResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (jobResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update job - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteJob(req, res, next) {
    try {
      const jobId = req.query.id
      const userId = req.body.user_id
      console.log(jobId)
      const jobResponse = await JobsDAO.deleteJob(
        jobId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}