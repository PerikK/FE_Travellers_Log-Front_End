export default function AddVisitModal({ isOpen, children, onClose }) {
    if (!isOpen) return null;

return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-DAmico_blue p-8 rounded-lg shadow-lg w-5/8  max-h-full overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}