import { useGlobalContext } from "../context"


const Sort = ({value}) => {
    const {allJobs, setAllJobs} = useGlobalContext()

    const handleSort = (value, dir) => {

        // console.log(second)
        if (dir === 'up') {
            let sorted = [...allJobs].sort((a,b) => {
                console.log(a[value])
                return a[value].localeCompare(b[value])
            })

            console.log(sorted)
            setAllJobs(sorted)

        } else {
            let sorted = [...allJobs].sort((a,b) => b[value].localeCompare(a[value]))
            // console.log(sorted)
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