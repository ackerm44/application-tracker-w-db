import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import CreatableSelect from 'react-select/creatable';



const Form = () => {
    const {closeModal, createJob, updateJob, jobInView} = useGlobalContext()
    const [title, setTitle] = useState("")
    const [company, setCompany] = useState("")
    const [dateOrigination, setDateOrigination] = useState("")
    const [dateApplied, setDateApplied] = useState("")
    const [source, setSource] = useState("")
    const [link, setLink] = useState("")
    const [status, setStatus] = useState("")
    const [sources, setSources] = useState([])
    const [notes, setNotes] = useState("")
    const [statuses, setStatuses] = useState([])

    const validateForm = () => {
        if (dateOrigination && source) {
            return true
        }
        return false
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (validateForm()) {
            if (jobInView.id) {
                let id = jobInView.id
                updateJob({id, title, company, dateOrigination, dateApplied, source, link, status, notes })
            } 
            else {
                createJob({ title, company, dateOrigination, dateApplied, source, link, status, notes })
            }
        }

        
        setTitle("")
        setCompany("")
        setDateOrigination("")
        setDateApplied("")
        setSource("")
        setLink("")
        setStatus("")
        setNotes("")
        closeModal()
    }

    const fetchSources = async () => {
        const res = await fetch('http://localhost:5000/sources')
        const data = await res.json()
        setSources(data)
        // setSource(data[0].label)
    }

    const fetchStatuses = async () => {
        const res = await fetch('http://localhost:5000/statuses')
        const data = await res.json()
        setStatuses(data)
        // setStatus(data[0].label)
    }

    // const fetchJob = async (editID) => {
    //     const res = await fetch(`http://localhost:5000/jobs/${editID}`)
    //     const data = await res.json()

    //     setTitle(data.title)
    //     setCompany(data.company)
    //     setDateOrigination(data.dateOrigination)
    //     setDateApplied(data.dateApplied)
    //     setSource(data.source)
    //     setLink(data.link)
    //     setStatus(data.status)
    // }

    useEffect(() => {
        fetchSources()
        fetchStatuses()

    }, [])

    useEffect(() => {
        if (jobInView) {
                setTitle(jobInView.title)
                setCompany(jobInView.company)
                setDateOrigination(jobInView.dateOrigination)
                setDateApplied(jobInView.dateApplied)
                setSource(jobInView.source)
                setLink(jobInView.link)
                setStatus(jobInView.status)
                setNotes(jobInView.notes)
        }
    }, [jobInView])


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="form-control col-4">
                    <label htmlFor="dateOrigination">Date of Origination</label>
                    <input type="date" name="dateOrigination" value={dateOrigination} onChange={e => setDateOrigination(e.target.value)}></input>
                </div>
                <div className="form-control col-4">
                    <label htmlFor="date">Date Applied</label>
                    <input type="date" name="dateApplied" value={dateApplied} onChange={e => setDateApplied(e.target.value)}></input>
                </div>
                <div className="form-control col-4">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className="form-control col-4">
                    <label htmlFor="company">Company</label>
                    <input type="text" name="company" value={company} onChange={e => setCompany(e.target.value)}></input>
                </div>
                <div className="form-control col-4">
                    <label htmlFor="source">Source</label>
                    <CreatableSelect
                        isClearable
                        onChange={(input) => setSource(input ? input.label : '')}
                        options={sources}
                        />
                    {/* <select name="source" value={source.title} onChange={e => setSource(e.target.value)}>
                        {sources.map((s) =>
                            <option key={s.id} value={s.title} >{s.title}</option>
                        )}
                    </select> */}
                </div>
                <div className="form-control col-4">
                    <label htmlFor="status">Status</label>
                    <CreatableSelect
                        isClearable
                        onChange={(input) => {
                            console.log(input)
                            setStatus(input.label)
                        }}
                        options={statuses}
                        />
                    {/* <select name="status" onChange={e => setStatus(e.target.value)}>
                        {statuses.map((status) =>
                            <option key={status.id} value={status.title}>{status.title}</option>
                        )}
                    </select> */}
                </div>
                <div className="form-control col-12">
                    <label htmlFor="link">Link</label>
                    <input type="url" name="link" value={link} onChange={e => setLink(e.target.value)}></input>
                </div>
                <div className="form-control col-12">
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" rows="4" cols="50" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                </div>
                <div className="d-flex col-12">
                    <button className="form-btn btn btn-warning" onClick={closeModal}>Cancel</button>
                    <button className="form-btn btn">Submit</button>
                </div>
            </form>
        </section>
    )
}

export default Form