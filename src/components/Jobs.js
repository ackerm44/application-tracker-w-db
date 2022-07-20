import Job from "./Job"
// import Sort from "./Sort"
import Filter from "./Filter"

const Jobs = ({ jobs, setEditID }) => {
    return (
        <section className="list">
            <table className="table-grid">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date Applied</th>
                        <th>Current Status <Filter type="status"/></th>
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