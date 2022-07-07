
const Job = ({ id, title, company, dateApplied, dateOrigination, status, source, link, setEditID }) => {
    const handleEdit = () => {
        setEditID(id)
    }

    const handleViewMore = () => {

    }

    return (
        <tr>
            <td>
                <button onClick={handleEdit}>Update</button>
                <button onClick={handleViewMore}>View More</button>
            </td>
            <td>{status}</td>
            <td>{company}</td>

        </tr>
    )
}

export default Job