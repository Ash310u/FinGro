import { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'inherit';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      onSendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full p-4">
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto relative bg-white rounded-lg shadow-md border border-gray-200"
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about investments, taxes, savings, or financial planning..."
          className="w-full bg-transparent text-gray-800 placeholder-gray-500 p-4 pr-12 resize-none overflow-hidden max-h-48 focus:outline-none focus:ring-2 focus:ring-blue-100"
          rows={1}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={`absolute right-2 bottom-3 p-2 rounded-lg transition-all duration-200 
            ${message.trim() 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-200 text-gray-400'
            }`}
        >
          <IoSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;