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
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-cyan-600/0 to-emerald-600/0 group-hover:from-emerald-600/10 group-hover:via-cyan-600/10 group-hover:to-emerald-600/10 transition-all duration-500 rounded-lg"></div>
      
      {/* Main content */}
      <div className="relative border-b border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col">
            <div className="text-gray-100 font-medium group-hover:text-cyan-300 transition-colors duration-300">
              {truncateTitle(chat.title)}
            </div>
            <div className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors duration-300">
              {chat.lastMessageTime}
            </div>
          </div>
          <div className="text-gray-500 hover:text-cyan-400 cursor-pointer p-2 hover:bg-gray-800/50 rounded-full transition-all duration-300 backdrop-blur-sm">
            <BsThreeDots />
          </div>
        </div>
        
        {/* Glowing border effect on hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-emerald-500/20 group-hover:via-cyan-500/20 group-hover:to-emerald-500/20 opacity-0 group-hover:opacity-100 rounded-lg transition-all duration-500 blur-sm pointer-events-none"></div>
      </div>
    </div>
  )
}

export default ChatOverview;