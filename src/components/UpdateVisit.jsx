import { useState, useEffect } from "react"
import useUser from "../hooks/useUser"

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function UpdateVist({visit, setVisit}) {
    const { user } = useUser()
    const [visit, setVisit] = useState({
        visitId: visit?.id,
        newLogEntries: [],
        newPictures
    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [previewUrls, setPreviewUrls] = useState([]) 
    const [isFullscreen, setIsFullscreen] = useState(false) 
    const [pictureSource, setPictureSource] = useState('upload')
    const [urlInput, setUrlInput] = useState('') 



    return (
        
    )
}