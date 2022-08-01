let statuses

export default class StatusesDAO {
    static async injectDB(conn) {
        if (statuses) {
            return 
        }
        try {
            statuses = await conn.db(process.env.APPLICATION_TRACKER_NS).collection("statuses")
        } catch (e) {
            console.error(`Unable to establish a collection handle in statusesDAO: ${e}`)
        }
    }

    static async getStatuses() {
        // let query
        // if (filters) {
        //     if ("status" in filters) {
        //         query = {"status": {$eq: filters["value"]} }
        //     }
        // }

        let cursor

        try {
            cursor = await statuses
                .find()
        } catch (e) {
            console.error(`Unable to issue find command: ${e}`)
            return { statusesList: [], totalNumStatuses: 0 }
        }

        // const displayCursor = cursor

        try {
            const statusesList = await cursor.toArray()
            const totalNumStatuses = await statuses.countDocuments()

            return {statusesList, totalNumStatuses}
        } catch (e) {
            console.error(`Unable to convert cursor to array or unable to count documents: ${e}`)
            return { statusesList: [], totalNumStatuses: 0}

        }

    }
    
}