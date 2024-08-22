import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"
import AddVisitForm from "../components/AddVisit"
import VisitsList from "../components/VisitsList"
import TopBar from "../components/TopBar"

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function UserPage() {
    const [visits, setVisits] = useState([])
    const { user, setUser, logout } = useUser()
    const navigate = useNavigate()
    
    if (!user || !user.id) {
        navigate('/')
        setUser(null)
        return
    }
     if (!user) return <div>Loading UserPage...</div>

    const handleAddVisit = (newVisit) => {
        setVisits(prevVisits => [...prevVisits, newVisit])
    }

    return (
        <>
            <div className="m-10 col-span-2 row-span-1 border-2 border-green-700 rounded-3xl"><TopBar /></div>
                {/* <div className="h-5 justify-items-center"> */}
                    <h2 className="my-12 mx-6 w-3/5  bg-DAmico_baige_pink rounded-full p-5 font-extrabold text-6xl text-Miro-orange_brown text-opacity-80 text-center">Welcome, {user?.username} </h2>
                    <div className='sticky grid gap-3 grid-cols-2'>
                        <div className="mx-7 p-5 bg-Miro-beige_dark border-2 border-solid border-stone-700 rounded-md shadow-xl">
                                <AddVisitForm onAddVisit={handleAddVisit} />
                        </div>
                        <div className="mx-7 p-5 bg-DAmico_blue border-2 border-solid border-stone-700 rounded-md shadow-xl overflow-scroll">
                            <h3 className=" mb-3 text-5xl text-center max-h-80 p-3  text-DAmico_dark_blue  rounded" >Your Visits</h3>
                                <VisitsList  visits={visits} setVisits={setVisits} />
                        </div>
                    </div>
            {/* </div> */}
        </>
    )
}