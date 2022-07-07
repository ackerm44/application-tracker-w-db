import {useState, useEffect} from 'react'
import Form from './components/Form'
import Jobs from './components/Jobs'

function App() {
  const [jobs, setJobs] = useState([])
  const [editID, setEditID] = useState(0)

  const fetchJobs = async () => {
    const res = await fetch('http://localhost:5000/jobs')
    const data = await res.json()

    setJobs(data)
  }

  const createJob = async (job) => {
    const res = await fetch('http://localhost:5000/jobs', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(job),
    })

    const data = await res.json()

    setJobs([...jobs, data])
  }

  const editJob = async (job) => {
    const res = await fetch(`http://localhost:5000/jobs/${job.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(job),
    })

    const data = await res.json()

    setJobs([...jobs, data])
  }

  useEffect(() => {
    fetchJobs()
  }, [])


  return (
    <div className="App">
      <h1 className="center">You've Got This</h1>
      <Form onAdd={createJob} onEdit={editJob} editID={editID}/>
      <Jobs jobs={jobs} setEditID={setEditID}/>
    </div>
  );
}

export default App;
