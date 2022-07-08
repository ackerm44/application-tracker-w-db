// import {useState} from 'react'
import { useGlobalContext } from '../context'


const Job = ({ job }) => {
    const {openModal, fetchJob } = useGlobalContext()


    const handleViewMore = () => {
        openModal()
        fetchJob(job.id)
    }

    return (
        <tr>
            <td>
                <button className="btn btn-sm" onClick={handleViewMore}>View</button>
            </td>
            <td>{job.status}</td>
            <td>{job.company}</td>

        </tr>
    )
}

export default Job