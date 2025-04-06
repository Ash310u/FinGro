import ReactDOM from "react-dom"
import { useEffect, useRef } from "react"

const Modal = ({ onClose, actionBar, cancelBar, spaceName, onSpaceNameChange, onCreateSpace }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        inputRef.current?.focus();
        
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    // useEffect(() => {
    //     const handleKeyPress = (event) => {
    //         if (event.key === 'Escape') {
    //             onClose();
    //         } else if (event.key === 'Enter' && spaceName.trim()) {
    //             onCreateSpace();
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyPress);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, [onClose, onCreateSpace, spaceName]);

    return ReactDOM.createPortal(
        <div className="flex justify-center items-center">
            <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className="flex flex-col justify-between fixed inset-0 m-auto p-10 bg-gray-100 max-w-[400px] max-h-[220px] rounded-xl shadow-md">
                <div className="text-2xl font-bold">Create New Space</div>
                <div className="flex flex-row justify-between items-center my-4">
                    <input 
                        ref={inputRef}
                        type="text"
                        placeholder="Enter Space name"
                        className="w-full p-1 rounded-md outline-none border-blue-500 border-[3px]"
                        value={spaceName}
                        onChange={onSpaceNameChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && spaceName.trim()) {
                                onCreateSpace();
                            } else if (e.key === 'Escape') {
                                onClose();
                            }
                        }}
                    />
                </div>
                <div className="flex flex-row justify-end gap-2 my-4">
                    {cancelBar}
                    {actionBar}
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
};

export default Modal;