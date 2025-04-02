import { BsThreeDots } from "react-icons/bs";

const ChatOverview = ({chat}) => {
  // Function to truncate title to 4-5 words
  const truncateTitle = (title) => {
    const words = title.split(' ');
    if (words.length <= 5) return title;
    return words.slice(0, 4).join(' ') + '...';
  };

  return (
    <div className="relative group">
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gray-50/0 group-hover:bg-gray-100/80 transition-all duration-300 rounded-lg"></div>
      
      {/* Main content */}
      <div className="relative border-b border-gray-200 hover:border-gray-300 transition-all duration-300">
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col">
            <div className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors duration-300">
              {truncateTitle(chat.title)}
            </div>
            <div className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-300">
              {chat.lastMessageTime}
            </div>
          </div>
          <div className="text-gray-400 hover:text-blue-500 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300" onClick={() => {
            console.log(chat.id);
          }}>
            <BsThreeDots />
          </div>
        </div>
        
        {/* Subtle shadow effect on hover */}
        <div className="absolute -inset-px opacity-0 group-hover:opacity-100 shadow-sm rounded-lg transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>
  )
}

export default ChatOverview;