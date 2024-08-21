import { useEffect, useState } from "react"
import useUser from "../hooks/useUser"
import ImageMOdal from '../components/ImageModal'

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function VisitsList({ visits, setVisits }) {
    const { user } = useUser()
    const id = user.id   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // const onClickOut
    
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
        <>
            {console.log(visits)}
            <ul className="h-full overflow-auto">
                {visits.map(visit => (
                    <li className="m-2 p-2" key={visit.id}>
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
                                {visit.pictures.map((picture) => (
                                    <li key={picture.id} className="">
                                        <img
                                            src={picture.pictureUrl}
                                            alt={`Visit ${visit.location.name}`}
                                            className="max-w-24 cursor-pointer"
                                            onClick={() => openModal(picture.pictureUrl)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
            <ImageMOdal isOpen={isModalOpen} onClose={closeModal}>
                {selectedImage && (
                    <img
                    src={selectedImage}
                    alt="Full view"
                    className="max-w-full max-h-full"
                    />
                )}
            </ImageMOdal>
        </>
    )
}