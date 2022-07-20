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
    const [statusHistory, setStatusHistory] = useState([])
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
                updateJob({id, title, company, dateOrigination, dateApplied, source, link, status, statusHistory, notes })
            } 
            else {
                createJob({ title, company, dateOrigination, dateApplied, source, link, status, statusHistory, notes })
            }
        }

        
        setTitle("")
        setCompany("")
        setDateOrigination("")
        setDateApplied("")
        setSource("")
        setLink("")
        setStatus("")
        setStatusHistory([])
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
                setStatusHistory(jobInView.statusHistory)
                setNotes(jobInView.notes)
        }
    }, [jobInView])

    const removeHistory = (i) => {
        let removal = statusHistory.filter((status, index) => index !== i)
        setStatusHistory(removal)

        // let id = jobInView.id
        updateJob({...jobInView, "statusHistory": jobInView.statusHistory})
    }


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="form-control col-3">
                    <label htmlFor="dateOrigination">Date of Origination</label>
                    <input type="date" name="dateOrigination" value={dateOrigination} onChange={e => setDateOrigination(e.target.value)}></input>
                </div>
                <div className="form-control col-3">
                    <label htmlFor="date">Date Applied</label>
                    <input type="date" name="dateApplied" value={dateApplied} onChange={e => setDateApplied(e.target.value)}></input>
                </div>
                <div className="form-control col-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className="form-control col-3">
                    <label htmlFor="company">Company</label>
                    <input type="text" name="company" value={company} onChange={e => setCompany(e.target.value)}></input>
                </div>
                <div className="form-control col-3">
                    <label htmlFor="source">Source</label>
                    <CreatableSelect
                        isClearable
                        onChange={(input) => setSource(input ? input.label : '')}
                        options={sources}
                        />
                </div>
                <div className="form-control col-3">
                    <label htmlFor="status">Status</label>
                    <CreatableSelect
                        isClearable
                        onChange={(input) => {
                            // console.log(input)
                            setStatus(input.label)
                            setStatusHistory([...statusHistory, input.label])
                        }}
                        options={statuses}
                        />
                </div>
                <div className="form-control col-6-row-2">
                    <label>Status History</label>
                        <div>
                            {statusHistory.map((status, i) => 
                                <p key={i}>{status} <span className="remove" onClick={() => removeHistory(i)}>X</span></p>
                            )}
                        </div>


                </div>
                <div className="form-control col-6">
                    <label htmlFor="link">Link</label>
                    <input type="url" name="link" value={link} onChange={e => setLink(e.target.value)}></input>
                </div>

                <div className="form-control col-12">
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" rows="15" cols="50" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                </div>
                <div className="d-flex col-12">
                    <button className="form-btn btn btn-warning" onClick={closeModal}>Cancel</button>
                    <button className="form-btn btn">Save</button>
                </div>
            </form>
        </section>
    )
}

export default Form