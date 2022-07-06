
const Job = ({title, company, date, source, link}) => {
  return (
    <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{company}</td>
        <td>{source}</td>
        <td><a href={link} target="_blank" rel="noreferrer">{`${link.slice(0,50)}...`}</a></td>

    </tr>
  )
}

export default Job