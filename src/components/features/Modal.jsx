import ReactDOM from "react-dom"
import { useEffect } from "react"

const Modal = ({ onClose, actionBar, cancelBar, spaceName, handleSpaceNameChange }) => {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    },[])
    
    return ReactDOM.createPortal(
        <div className="flex justify-center items-center">
            <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className="flex flex-col justify-between fixed inset-0 m-auto p-10 bg-gray-100 max-w-[400px] max-h-[220px] rounded-xl shadow-md">
                <div className="text-2xl font-bold">Create New Space</div>
                <div className="flex flex-row justify-between items-center my-4">
                    <input type="text" placeholder="Enter Space name" className="w-full p-2 rounded-md border-2 border-gray-300 outline-none focus:border-blue-500" value={spaceName} onChange={handleSpaceNameChange}/>
                </div>
                <div className="flex flex-row justify-end gap-2 my-4">
                    {cancelBar}
                    {actionBar}
                </div>
            </div>
        </div>,

        document.querySelector('.modal-container')
    )
}

export default Modal