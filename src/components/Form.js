import { useEffect, useState} from 'react'

const Form = ({ onAdd }) => {
    const [title, setTitle] = useState("")
    const [company, setCompany] = useState("")
    const [date, setDate] = useState("")
    const [source, setSource] = useState("")
    const [link, setLink] = useState("")
    const [sources, setSources] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd({ title, company, date, source, link })
        setTitle("")
        setCompany("")
        setDate("")
        setSource(sources[0].title)
        setLink("")
    }

      const fetchSources = async () => {
        const res = await fetch('http://localhost:5000/sources')
        const data = await res.json()
        setSources(data)
        setSource(data[0].title)
    }

    useEffect(() => {
        fetchSources()
    }, [])


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="date">Date Applied</label>
                    <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="company">Company</label>
                    <input type="text" name="company" value={company} onChange={e => setCompany(e.target.value)}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="source">Source</label>
                    <select name="source" onChange={e => setSource(e.target.value)}>
                        {sources.map((source) => 
                            <option key={source.id} value={source.title}>{source.title}</option>
                        )}
                    </select>
                    {/* <input type="text" name="source" value={source} onChange={e => setSource(e.target.value)}></input> */}
                </div>
                <div className="form-control">
                    <label htmlFor="link">Link</label>
                    <input type="url" name="link" value={link} onChange={e => setLink(e.target.value)}></input>
                </div>
                <button className="submit">Submit</button>
            </form>
        </section>
    )
}

export default Form