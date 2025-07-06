const ConfirmModal = ({onConfirm, onCancel} : { onConfirm: () => void, onCancel: () => void }) => {
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="mb-4">Are you sure you want to make these changes ?.</p>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
};
export default ConfirmModal;