// Connect to db and start server

import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import JobsDAO from './dao/jobsDAO.js'
import StatusesDAO from './dao/statusesDAO.js'
import SourcesDAO from './dao/sourcesDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 5000
MongoClient.connect(
    process.env.APPLICATION_TRACKER_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack )
    process.exit(1)
}) 
.then(async client => {
    await JobsDAO.injectDB(client) // this is where we get initial reference to jobs data in DB
    await StatusesDAO.injectDB(client)
    await SourcesDAO.injectDB(client)
    // app.listen() is where we actually start our web server
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})
