
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let jobs

export default class JobsDAO {
    static async injectDB(conn) {
        if (jobs) {
            return
        }
        try {
            jobs = await conn.db(process.env.APPLICATION_TRACKER_NS).collection("jobs")
        } catch (e) {
            console.error(`Unable to establish a collection handle in jobsDAO: ${e}`)
        }
    }

    static async getJobs({
        filters = null,
        page = 0,
        jobsPerPage = 20
    } = {}) {
        let query
        if (filters) {
            if ("company" in filters) {
                query = { $text: { $search: filters["company"] } }
            } else if ("status" in filters) {
                query = { "status": { $eq: filters["status"] } }
            }
            // Future maybe to-dos: date, 
        }

        let cursor

        try {
            cursor = await jobs
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command: ${e}`)
            return { jobsList: [], totalNumJobs: 0 }
        }

        const displayCursor = cursor.limit(jobsPerPage).skip(jobsPerPage * page)

        try {
            const jobsList = await displayCursor.toArray()
            const totalNumJobs = await jobs.countDocuments(query)

            return { jobsList, totalNumJobs }
        } catch (e) {
            console.error(`Unable to convert cursor to array or unable to count documents: ${e}`)
            return { jobsList: [], totalNumJobs: 0 }

        }

    }

    static async getJobByID(id) {
        try {
            return await jobs.findOne({"_id": ObjectId(id)})
        } catch (e) {
            console.error(`Something went wrong in getJobByID: ${e}`)
            throw e
        }
    }

    static async addJob(job) {
        try {
            const jobDoc = {
                title: job.title,
                company: job.company,
                dateOrigination: job.dateOrigination,
                dateApplied: job.dateApplied,
                source: job.source,
                link: job.link,
                status: job.status,
                statusHistory: job.statusHistory,
                notes: job.notes
            }
            // console.log(`addJob ${job}`)
            return await jobs.insertOne(jobDoc)
        } catch (e) {
            console.error(`Unable to post job: ${e}`)
            return { error: e }
        }
    }

    static async updateJob(job) {
        try {

            const jobDoc = {
                title: job.title,
                company: job.company,
                dateOrigination: job.dateOrigination,
                dateApplied: job.dateApplied,
                source: job.source,
                link: job.link,
                status: job.status,
                statusHistory: job.statusHistory,
                notes: job.notes
            }
            const updateResponse = await jobs.updateOne({_id: ObjectId(job._id)}, {$set: jobDoc})

            return updateResponse
        } catch (e) {
            console.error(`Unable to update job: ${e}`)
            return { error: e }
        }
    }

    static async deleteJob(jobId, userId) {

        try {
            const deleteResponse = await jobs.deleteOne({_id: ObjectId(jobId)})

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete job: ${e}`)
            return { error: e }
        }
    }

}