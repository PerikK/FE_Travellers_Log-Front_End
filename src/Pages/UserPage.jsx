import { useState, useEffect } from "react"
import useUser from "../hooks/useUser"
import AddVisitForm from "../components/AddVisit"
import VisitsList from "../components/VisitsList"
import { useNavigate } from "react-router-dom"
import TopBar from "../components/TopBar"

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function UserPage() {
    const [visits, setVisits] = useState([])
    const { user, setUser, logout } = useUser()
    const navigate = useNavigate()
    
    // if (!user || !user.id) {
    //     navigate('/')
    //     setUser(null)
    //     return
    // }
     if (!user) return <div>Loading UserPage...</div>

    const handleAddVisit = (newVisit) => {
        setVisits(prevVisits => [...prevVisits, newVisit])
    }

    return (
        <>
            <div className="m-10 col-span-2 row-span-1"><TopBar /></div>
            <div className="h-5/6">
            <h2 className="mt-12 p-3 text-2xl text-center">Welcome, {user?.username} </h2>
            <div className='sticky grid gap-3 grid-cols-2'>
                <div className="p-5 bg-teal-900 border-2 border-solid border-stone-700 rounded-md">
                        <AddVisitForm onAddVisit={handleAddVisit} />
                        <p>test1</p>
                </div>
                <div className="p-5 bg-teal-900 border-2 border-solid border-stone-700 rounded-md shadow-xl">
                    <h3 className="mb-3 text-xl text-center" >Your Visits</h3>
                        <VisitsList  visits={visits} setVisits={setVisits} />
                        <p>test1</p>
                </div>
            </div>
            </div>
        </>
    )
}