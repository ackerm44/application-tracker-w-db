import {useState} from 'react'

const Form = ({onAdd}) => {
    const [title, setTitle] = useState("")
    const [company, setCompany] = useState("")
    const [date, setDate] = useState("")
    const [source, setSource] = useState("")
    const [link, setLink] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd({title, company, date, source, link})
    }

  return (
    <section>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}></input>
            <label htmlFor="company">Company</label>
            <input type="text" name="company" value={company} onChange={e => setCompany(e.target.value)}></input>
            <label htmlFor="date">Date Applied</label>
            <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)}></input>
            <label htmlFor="source">Source</label>
            <input type="text" name="source" value={source} onChange={e => setSource(e.target.value)}></input>
            <label htmlFor="link">Link</label>
            <input type="text" name="link" value={link} onChange={e => setLink(e.target.value)}></input>
            <input type="submit"></input>
        </form>
    </section>
  )
}

export default Form