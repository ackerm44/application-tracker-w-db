let sources

export default class SourcesDAO {
    static async injectDB(conn) {
        if (sources) {
            return 
        }
        try {
            sources = await conn.db(process.env.APPLICATION_TRACKER_NS).collection("sources")
        } catch (e) {
            console.error(`Unable to establish a collection handle in sourcesDAO: ${e}`)
        }
    }

    static async getSources() {
        let cursor

        try {
            cursor = await sources
                .find()
        } catch (e) {
            console.error(`Unable to issue find command: ${e}`)
            return { sourcesList: [], totalNumSources: 0 }
        }

        try {
            const sourcesList = await cursor.toArray()
            const totalNumSources = await sources.countDocuments()

            return {sourcesList, totalNumSources}
        } catch (e) {
            console.error(`Unable to convert cursor to array or unable to count documents: ${e}`)
            return { sourcesList: [], totalNumSources: 0}

        }

    }
    
}