import { useState } from "react"
import useUser from "../hooks/useUser"

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function AddVisitForm({ onAddVisit }){
    const [visit, setVisit] = useState({ userId: '', name: '', logEntry: '', pictureUrl: ''})
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { user } = useUser()
    const userId = user.id

    const handleClick = () => {
        setError(null)
        setSuccess(null)
        setVisit({ userId, name: '', logEntry: '', pictureUrl: '' })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setVisit(prevVisits => ({
            ...prevVisits, [name]: value
        }))
        setError(null)
        setSuccess(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${apiUrl}/visits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(visit)
            })
            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.error)
            } else {
                onAddVisit(result.visit_created)
                setVisit({ name: '', logEntry: '', pictureUrl: '' })
                setSuccess('Visit created succesfully!')
                setError(null)
            }            
        }catch (error) {
            setError(error.message)
        }

    }    
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Location:
                    <input className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl" type="text" name="title" value={visit.name} onChange={handleChange} onClick={handleClick} />
                </label>
            </div>
            <div>
                <label>
                    Logs:
                    <input className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl" type="text" name="logs" value={visit.logs} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Images:
                    <input className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl"  type="text" name="image" value={visit.pictureUrl} onChange={handleChange} />
                </label>
            </div>
            <button type="submit" className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl ">Add visit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    )
}