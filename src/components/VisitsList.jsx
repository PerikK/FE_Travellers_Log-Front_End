import { useEffect, useState } from "react"
import useUser from "../hooks/useUser"

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function VisitsList({ visits, setVisits }) {
    const { user } = useUser()
    const id = user.id   
    
    useEffect(() => {
        if (!user) return <div>Loading visits...</div>
        const fetchVisits = async () => {
            try {
                const response = await fetch(`${apiUrl}/visits/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setVisits(data.user_visits)
            } catch (e) {
                console.error(`A problem occured while fetching user's visits`,e)
            }
        }
        fetchVisits()
    },[user,id, setVisits])


    return (
        <ul className="h-full overflow-auto">
            {visits.map(visit => (
                <li className="m-2" key={visit.id}>
                    <div className="max-h-80 p-3 bg-stone-300 rounded">
                        <h3>{visit.location.name}</h3>
                        <p>Logs: </p>
                        <ul>
                            {visit.logEntries.map(log => (
                                <li key={log.id}>{log.logText}</li>
                            ))}
                        </ul>
                        <p>Pictures:</p>
                        <ul>
                            {visit.pictures.map(picture => (
                                <li key={picture.id}>
                                    <img src={picture.url} alt={`Visit ${visit.location.name}`} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
            ))}
        </ul>
    )
}