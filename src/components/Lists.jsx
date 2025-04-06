import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatOverview from './ChatOverview';
import Button from './features/Button';
import { GoPlus } from 'react-icons/go';
import Modal from './features/Modal';
import { MdKeyboardCommandKey } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineEnter } from "react-icons/ai";


const Lists = () => {
    console.log('Lists component rendered');
    const [chats, setChats] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [spaceName, setSpaceName] = useState('');
    
    const handleOpenModal = () => {
        setShowModal(true);
    }
    
    const handleSpaceNameChange = (e) => {
        setSpaceName(e.target.value);
    }
    
    const handleClose = () => {
        setShowModal(false);
        setSpaceName('');
    }
    
    const handleCreateSpace = () => {
        if (spaceName.trim() === '') {
            console.log('Space name cannot be empty');
            return;
        }
        setChats([...chats, {id: chats.length + 1, title: spaceName}]);
        setSpaceName('');
        setShowModal(false);
    }

    const actionBar = <div>
        <Button onClick={handleCreateSpace} primary rounded>
            Done
        </Button>
    </div>
    
    // Add keyboard shortcut for Command + Enter to open modal
    useEffect(() => {
        console.log('useEffect for keyboard shortcut initialized');
        const handleKeyDown = (event) => {
            console.log('Key pressed:', event.key);
            console.log('Meta key:', event.metaKey);
            console.log('Ctrl key:', event.ctrlKey);
            
            // Check for Command/Meta + Enter key combination
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                console.log('Command + Enter detected');
                event.preventDefault();
                handleOpenModal();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        // Clean up event listener on component unmount
        return () => {
            console.log('Cleaning up keyboard event listener');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const cancelBar = <div>
        <Button onClick={handleClose} secondary rounded>
            Cancel
        </Button>
    </div>

    let content = chats.map((chat) => {
        return (
            <Link to={`/chat/${chat.id}`} key={chat.id} className="block">
                <ChatOverview chat={chat} />
            </Link>
        )
    })
    
    return (
        <div className="w-72 bg-white shadow-md border-r border-gray-200">
            <div className="flex flex-col m-2 p-2">
                <div className="flex flex-col">
                    <Link to="/" className="block">
                        <div className="font-bold text-2xl text-gray-800 p-4 flex items-center">
                            <span className="relative">
                                FinGro
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-500"></span>
                            </span>
                        </div>
                        <div className="flex flex-col justify-self-end p-4 gap-1.5">
                            <Button primary rounded onClick={handleOpenModal} className="outline-none hover:bg-white hover:text-blue-500 font-light">
                                <GoPlus className="mr-2 font-light" />
                                New Space
                            </Button>
                            <div className="flex flex-row items-center justify-end gap-1 text-gray-500 text-xs">
                                <MdKeyboardCommandKey className="font-light" />
                                <FaPlus className="font-bold text-[8px]" />
                                <AiOutlineEnter className="font-extrabold" />
                            </div>
                        </div>
                    </Link>
                    <div className="space-y-1">
                        {content}
                    </div>
                </div>
            </div>
            {showModal && <Modal onClose={handleClose} actionBar={actionBar} cancelBar={cancelBar} spaceName={spaceName} onSpaceNameChange={handleSpaceNameChange} onCreateSpace={handleCreateSpace}/>}
        </div>
    )
}

export default Lists;