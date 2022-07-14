import Job from "./Job"
import Sort from "./Sort"

const Jobs = ({ jobs, setEditID }) => {
    return (
        <section className="list">
            <table className="table-grid">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date Applied <Sort value="dateApplied"/></th>
                        <th>Status <Sort value="status"/></th>
                        <th>Company <Sort value="company"/></th>
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