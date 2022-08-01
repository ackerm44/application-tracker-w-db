import {useState} from 'react'
// import Form from './components/Form'
import Jobs from './components/Jobs'
import Modal from './components/Modal'
import ChartDisplay from './components/ChartDisplay'
import { useGlobalContext } from './context'


function App() {
  const {openModal, jobsInView} = useGlobalContext()
  const [editID, setEditID] = useState(0)

  return (
    <div className="App">
      <section className="main-wrapper">
        <h1 className="center">You've Got This</h1>
        <div className="center m-2"><button className="btn" onClick={openModal}>Add New</button></div>
        <Jobs jobs={jobsInView} setEditID={setEditID}/>
        <Modal />
        <ChartDisplay />
      </section>
      
    </div>
  );
}

export default App;
