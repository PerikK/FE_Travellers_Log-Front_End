import { useState, useEffect } from "react"
import useUser from "../hooks/useUser"

export default function UpdateVisit({ visit, onVisitUpdate, setIsModalOpen }) {
    const [visitUpdate, setVisitUpdate] = useState({
        userId: visit.userId,
        visitId: visit.id,
        newLogEntries: [],
        newPictures: []
    });
    const [error, setError] = useState(null);
    const [newLogEntry, setNewLogEntry] = useState("");  // For the input field
    const [newLogEntries, setNewLogEntries] = useState(visit.newLogEntries || []);
    const [newPictures, setNewPictures] = useState(visit.newPictures || []);
    const [previewUrls, setPreviewUrls] = useState([]); 
    const [pictureSource, setPictureSource] = useState('upload');
    const [urlInput, setUrlInput] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrls([...previewUrls, reader.result]);
                setVisitUpdate(prev => ({
                    ...prev,
                    newPictures: [...prev.newPictures, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlChange = () => {
        setPreviewUrls([...previewUrls, urlInput]);
        setVisitUpdate(prev => ({
            ...prev,
            newPictures: [...prev.newPictures, urlInput]
        }));
        setUrlInput('');
    };

        const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newLogEntry.trim()) {
            setNewLogEntries([...newLogEntries, newLogEntry.trim()]);
            setNewLogEntry(""); 
        }
    };

    const handleLogEntryChange = (e) => {
        setVisitUpdate(prev => ({
            ...prev,
            newLogEntries: [...prev.newLogEntries, e.target.value]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onVisitUpdate(visitUpdate);
    };

    return (
        <div className="bg-DAmico_orange">
            <div className="modal-content">
                <h2 className="text-3xl text-center text-DAmico_dark_blue">Update Visit</h2>
                <form onSubmit={handleSubmit}>
                    <label className="text-2xl text-DAmico_dark_blue">
                        New Log Entries:
                        <textarea onChange={handleLogEntryChange} />
                    </label>
                    <label className=" m-3 text-xl text-DAmico_dark_blue">
                        Picture Source:
                        <select value={pictureSource} onChange={(e) => setPictureSource(e.target.value)}>
                            <option value="url">URL</option>
                            <option value="upload">Upload from Computer</option>
                        </select>
                    </label>
                    {pictureSource === 'upload' ? (
                        <input type="file" onChange={handleFileChange} />
                    ) : (
                        <>
                            <input className="m-3"
                                type="text"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />
                            <button className="m-3 p-2 text-l bg-Miro-mauve_dark text-DAmico_dark_blue bg-" type="button" onClick={handleUrlChange}>Add URL</button>
                        </>
                    )}
                    <div>
                        {previewUrls.map((url, index) => (
                            <img key={index} src={url} alt="Preview" className="preview-img" />
                        ))}
                    </div>
                    <button className="m-3 p-2 text-2xl bg-Miro-mauve_dark text-DAmico_dark_blue bg-" type="submit">Update Visit</button>
                    <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}
