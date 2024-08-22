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
            <ul className="h-full ">
                {visits.map(visit => (
                    <li className="p-4 overflow-y-clip" key={visit.id}>
                        <div className="max-h-max p-7 bg-sky-900 text-sky-300 border-green-600 rounded-xl">
                            <h2 className="text-3xl">{visit.location.name}</h2>
                            <p className="text-sky-600 text-2xl">Logs: </p>
                            <ul>
                                {visit.logEntries.map(log => (
                                    <li key={log.id}>{log.logText}</li>
                                ))}
                            </ul>
                            <p className="text-sky-600 text-2xl">Pictures:</p>
                            <ul className="flex overflow-x-scroll">
                                {visit.pictures.map((picture) => (
                                    <li key={picture.id} >
                                        <img
                                            src={picture.pictureUrl}
                                            alt={`Visit ${visit.location.name}`}
                                            className="max-w-24 m-4 cursor-pointer"
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