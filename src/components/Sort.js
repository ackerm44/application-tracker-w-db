import { useGlobalContext } from "../context"


const Sort = ({value}) => {
    const {allJobs, setAllJobs} = useGlobalContext()

    const handleSort = (value, dir) => {
        let first = `a.${value}`
        let second = `b.${value}`
        console.log(first)
        console.log(second)
        if (dir == 'up') {
            let sorted = [...allJobs].sort((a,b) => first.localeCompare(second))
            console.log(sorted)
            setAllJobs(sorted)

        } else {
            let sorted = [...allJobs].sort((a,b) => second.localeCompare(first))
            console.log(sorted)
            setAllJobs(sorted)

        }

    }

    return (
        <span className="sort-icons">
            <span onClick={() => {handleSort(value, 'up')}}>&#x25B2;</span>
            <span onClick={() => {handleSort(value, 'down')}}>&#x25BC;</span>
        </span>
    )
}

export default Sort