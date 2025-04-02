import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatOverview from './ChatOverview';
import Button from './features/Button';
import { GoPlus } from 'react-icons/go';
import Modal from './features/Modal';

const Lists = () => {
    const [chats, setChats] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [spaceName, setSpaceName] = useState('');
    
    const handleSpaceNameChange = (e) => {
        setSpaceName(e.target.value);
    }
    
    const handleClose = () => {
        setShowModal(false);
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
                        <div className="flex-1 justify-self-end p-4">
                            <Button primary rounded onClick={() => setShowModal(true)}>
                                <GoPlus className="mr-2" />
                                New Chat
                            </Button>
                        </div>
                    </Link>
                    <div className="space-y-1">
                        {content}
                    </div>
                </div>
            </div>
            {showModal && <Modal onClose={handleClose} actionBar={actionBar} cancelBar={cancelBar} spaceName={spaceName} handleSpaceNameChange={handleSpaceNameChange}/>}
        </div>
    )
}

export default Lists;