import { useState, useEffect } from "react"
import useUser from "../hooks/useUser"

const port = 4000
const apiUrl = `https://be-travellers-log-back-end.vercel.app`

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
    const [previewUrls, setPreviewUrls] = useState([]) 
    const [isFullscreen, setIsFullscreen] = useState(false) 
    const [pictureSource, setPictureSource] = useState('upload')
    const [urlInput, setUrlInput] = useState('') 

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
        setPreviewUrls([]) 
        setUrlInput('') 
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

    const handleUrlChange = (e) => {
        const { value } = e.target
        setUrlInput(value) 
    }

    const handleAddUrl = () => {
        if (urlInput.trim()) {
            setPreviewUrls(prevUrls => [...prevUrls, urlInput])
            setVisit(prevVisit => ({
                ...prevVisit,
                pictures: [...prevVisit.pictures, urlInput]
            }))
            setUrlInput('') 
        }
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const fileReaders = []
        const newPictures = []
        const newPreviewUrls = []

        files.forEach((file, index) => {
            const reader = new FileReader()
            fileReaders.push(reader)

            reader.onloadend = () => {
                newPreviewUrls.push(reader.result)
                newPictures.push(reader.result)

                if (index === files.length - 1) {
                    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls])
                    setVisit(prevVisit => ({
                        ...prevVisit,
                        pictures: [...prevVisit.pictures, ...newPictures]
                    }))
                }
            }
            reader.readAsDataURL(file)
        })
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
                setVisit({
                    userId: user.id,
                    locationName: '',
                    logEntries: [],
                    pictures: []
                })
                setPreviewUrls([]) 
                setSuccess('Visit created successfully!')
                setError(null)
            }
        } catch (error) {
            console.error('Error creating visit:', error)
            setError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="text-DAmico_orange text-2xl font-extrabold">
                    Location:
                    <input
                        className="m-7 px-3 py-1 text-center border-2 border-stone-900 bg-Miro-mauve_dark rounded-md shadow-xl"
                        type="text"
                        name="locationName"
                        value={visit.locationName}
                        onChange={handleChange}
                        onClick={handleClick}
                    />
                </label>
            </div>
            <div>
                <label className="text-stone-700 text-2xl font-extrabold">
                    Log Entry:
                    <input
                        className="m-7 px-3 py-1 text-center border-2 border-stone-00 bg-DAmico_blue rounded-md shadow-xl"
                        type="text"
                        name="logEntry"
                        value={visit.logEntries[0] || ''}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label className="text-DAmico_orange text-2xl font-extrabold"> 
                    Picture Source:
                    <select
                        className="m-7 px-3 py-1 text-center border-2 border-stone-900 bg-DAmico_blue rounded-md shadow-xl"
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
                    <label className="text-sky-600 text-xl font-extrabold">
                        Pictures:
                        <input
                            className="m-7 px-3 py-1 text-center border-2 border-stone-900 bg-sky-300 rounded-md shadow-xl"
                            type="file"
                            name="pictureFile"
                            onChange={handleFileChange} 
                            multiple 
                        />
                    </label>
                </div>
            ) : (
                <div>
                    <label>
                        Picture URL:
                        <input
                            className="m-7 px-3 py-1 text-center border-2 border-stone-900 bg-sky-300 rounded-md shadow-xl"
                            type="text"
                            name="pictureUrl"
                            value={urlInput}
                            onChange={handleUrlChange} 
                        />
                    </label>
                    <button 
                        type="button" 
                        onClick={handleAddUrl}
                        className="ml-2 px-3 py-1 bg-DAmico_dark_blue hover:bg-DAmico_blue text-white rounded-lg shadow-xl"
                    >
                        Add Picture
                    </button>
                </div>
            )}
            {previewUrls.length > 0 && (
                <div className="flex space-x-4">
                    {previewUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-32 h-32 object-cover cursor-pointer"
                            onClick={() => setIsFullscreen(url)} 
                        />
                    ))}
                </div>
            )}
            {isFullscreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setIsFullscreen(false)} 
                >
                    <img src={isFullscreen} alt="Fullscreen Preview" className="max-w-full max-h-full" />
                </div>
            )}
            <button type="submit" className="m-7 px-3 py-1 text-center text-white border-2 border-stone-500 bg-DAmico_dark_blue hover:bg-DAmico_blue rounded-md shadow-xl">
                Add visit
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    )
}
