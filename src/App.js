import {useState, useEffect} from 'react'
import Form from './components/Form'
import Jobs from './components/Jobs'
import Modal from './components/Modal'
import { useGlobalContext } from './context'


function App() {
  const {openModal, allJobs} = useGlobalContext()
  const [editID, setEditID] = useState(0)

  console.log(allJobs)
  return (
    <div className="App">
      <h1 className="center">You've Got This</h1>
      <div className="center"><button className="btn" onClick={openModal}>Add New</button></div>
      <Jobs jobs={allJobs} setEditID={setEditID}/>
      <Modal />
    </div>
  );
}

export default App;
