import Job from "./Job"

const Jobs = ({jobs}) => {
  return (
    <section>
        {
            jobs.map((job) => {
                return (
                   <Job key={job.id} {...job}/>
                )
            })

        }
    </section>
  )
}

export default Jobs