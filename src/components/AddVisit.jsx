import { useState, useEffect } from "react"
import useUser from "../hooks/useUser"

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function AddVisitForm({ onAddVisit }) {
    const { user } = useUser()
    const [visit, setVisit] = useState({
        userId: user?.id || '',
        locationName: '',
        logEntries: [],
        pictures: [] 
    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null) 
    const [isFullscreen, setIsFullscreen] = useState(false) 
    const [pictureSource, setPictureSource] = useState('upload')

    useEffect(() => {
        if (user) {
            setVisit(prevVisit => ({ ...prevVisit, userId: user.id }))
        }
    }, [user])

    const handleClick = () => {
        setError(null)
        setSuccess(null)
        setVisit(prevVisit => ({
            ...prevVisit,
            locationName: '',
            logEntries: [],
            pictures: []
        }))
        setPreviewUrl(null)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "logEntry") {
            setVisit(prevVisit => ({
                ...prevVisit,
                logEntries: [value]
            }))
        } else {
            setVisit(prevVisit => ({
                ...prevVisit,
                [name]: value
            }))
        }

        setError(null)
        setSuccess(null)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result) 
                setVisit(prevVisit => ({
                    ...prevVisit,
                    pictures: [reader.result] 
                }))
            }
            reader.readAsDataURL(file) 
        }
    }

    const handleUrlChange = (e) => {
        const { value } = e.target
        setPreviewUrl(value) 
        setVisit(prevVisit => ({
            ...prevVisit,
            pictures: [value] 
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Submitting Visit Data:', visit) 

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
                setVisit({
                    userId: user.id,
                    locationName: '',
                    logEntries: [],
                    pictures: []
                })
                setPreviewUrl(null) 
                setSuccess('Visit created successfully!')
                setError(null)
            }
        } catch (error) {
            console.log('Error creating visit:', error)
            setError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Location:
                    <input
                        className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl"
                        type="text"
                        name="locationName"
                        value={visit.locationName}
                        onChange={handleChange}
                        onClick={handleClick}
                    />
                </label>
            </div>
            <div>
                <label>
                    Log Entry:
                    <input
                        className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl"
                        type="text"
                        name="logEntry"
                        value={visit.logEntries[0] || ''}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Picture Source:
                    <select
                        className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl"
                        value={pictureSource}
                        onChange={(e) => setPictureSource(e.target.value)}
                    >
                        <option value="upload">Upload from Computer</option>
                        <option value="url">URL</option>
                    </select>
                </label>
            </div>
            {pictureSource === 'upload' ? (
                <div>
                    <label>
                        Picture:
                        <input
                            className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl"
                            type="file"
                            name="pictureFile"
                            onChange={handleFileChange} 
                        />
                    </label>
                </div>
            ) : (
                <div>
                    <label>
                        Picture URL:
                        <input
                            className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl"
                            type="text"
                            name="pictureUrl"
                            value={visit.pictures[0] || ''}
                            onChange={handleUrlChange} 
                        />
                    </label>
                </div>
            )}
            {previewUrl && (
                <div>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover cursor-pointer"
                        onClick={() => setIsFullscreen(true)} 
                    />
                    {isFullscreen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                            onClick={() => setIsFullscreen(false)} 
                        >
                            <img src={previewUrl} alt="Fullscreen Preview" className="max-w-full max-h-full" />
                        </div>
                    )}
                </div>
            )}
            <button type="submit" className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl">
                Add visit
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    )
}
