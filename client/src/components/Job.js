// import {useState} from 'react'
import { useGlobalContext } from '../context'


const Job = ({ job }) => {
    const {openModal, fetchJob } = useGlobalContext()
    let date = new Date(job.dateApplied)

    const handleViewMore = () => {
        openModal()
        fetchJob(job._id)
    }

    return (
        <tr>
            <td>
                <button className="btn btn-sm" onClick={handleViewMore}>View</button>
            </td>
            <td>{date.toDateString().slice(4)}</td>
            <td>{job.status}</td>
            <td>{job.company}</td>

        </tr>
    )
}

export default Job