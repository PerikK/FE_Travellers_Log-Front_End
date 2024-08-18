import { useEffect, useRef } from 'react'

export default function LoginRegisterModal({ show, handleClose, title, children }) {
    const initialFocusRef = useRef(null)

    useEffect(() => {
        if (show && initialFocusRef.current) {
            initialFocusRef.current.focus()
        }
    }, [show])

    if (!show) {
        return null
    }
    
    return (
        <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 focus:outline-none"
                onClick={handleClose}
                >
                X
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
                {children}
            </div>
        </div>
    )
}