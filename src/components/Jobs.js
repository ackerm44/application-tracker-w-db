import Job from "./Job"

const Jobs = ({ jobs }) => {
    return (
        <section className="list">
            <table className="table-grid">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Source</th>
                        <th>Link</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        jobs.map((job) => {
                            return (
                                <Job key={job.id} {...job} />
                            )
                        })

                    }
                </tbody>
            </table>

        </section>
    )
}

export default Jobs