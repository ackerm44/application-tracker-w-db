import React, { useState, useEffect, useContext} from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isEditing, setIsEditing] = useState(false)
    const [allJobs, setAllJobs] = useState([])
    const [jobsInView, setJobsInView] = useState([])
    const [jobInView, setJobInView] = useState({
        "title": '',
        "company": '',
        "status": '',
        "dateOrigination": '',
        "dateApplied": '',
        "source": '',
        "statusHistory": [],
        "link": '',
        "notes": ''
    })

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchJobs = async () => {
        const res = await fetch('http://localhost:5000/jobs')
        const data = await res.json()
        setAllJobs(data)
        setJobsInView(data)
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
        // console.log(data)
        setAllJobs([...allJobs, data])
    }

    const updateJob = async (job) => {
        await fetch(`http://localhost:5000/jobs/${job.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(job),
        })

        // const data = await res.json()

        fetchJobs()
    }


    const fetchJob = async (id) => {
        const res = await fetch(`http://localhost:5000/jobs/${id}`)
        const data = await res.json()
        setJobInView(data)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <AppContext.Provider
            value={{
                isModalOpen,
                allJobs, 
                jobInView,
                jobsInView,
                setAllJobs,
                setJobsInView,
                fetchJob,
                createJob,
                updateJob,
                openModal,
                closeModal,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};



export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
