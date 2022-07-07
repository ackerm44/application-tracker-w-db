import Job from "./Job"

const Jobs = ({ jobs, setEditID }) => {
    return (
        <section className="list">
            <table className="table-grid">
                <thead>
                    <tr>
                        <th></th>
                        <th>Status</th>
                        <th>Company</th>

                    </tr>

                </thead>
                <tbody>
                    {
                        jobs.map((job) => {
                            return (
                                <Job key={job.id} job={job} setEditID={setEditID} />
                            )
                        })

                    }
                </tbody>
            </table>

        </section>
    )
}

export default Jobs