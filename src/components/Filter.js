import { useGlobalContext } from "../context"

const Filter = ({ type }) => {
    const {allJobs, setJobsInView} = useGlobalContext()
    
    let selectOptions = allJobs.reduce((prevVal, currVal) => {
        let currType = currVal[type];
        return (
            [...prevVal, currType]
        )
    }, [])
    selectOptions = [...new Set(selectOptions)]

    const handleSelect = (e) => {        
        let jobs = e.target.value === "all" ? allJobs : allJobs.filter((job) => job.status === e.target.value)
        setJobsInView(jobs)
    }

    return (
        <select onChange={handleSelect}>
            <option disabled>Filter...</option>
            {selectOptions.map((option, i) => 
                <option key={i} value={option}>{option}</option>
            )}
            <option value="all">Show All</option>
        </select>
    )
}

export default Filter