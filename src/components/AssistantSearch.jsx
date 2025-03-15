import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Advisor from '../AI/advisor';
const AssistantSearch = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (messageText) => {
        try {
            setIsLoading(true);

            // Add user message to chat
            const userMessage = {
                role: 'user',
                content: messageText,
            };
            setMessages(prev => [...prev, userMessage]);

            const advisorResponse = await Advisor(messageText);
            
            const aiMessage = {
                role: 'assistant',
                content: advisorResponse,
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Error getting AI response:', error);
            setMessages(prev => [...prev, {
                role: 'error',
                content: 'Sorry, I encountered an error. Please try again.',
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center p-2 bg-gradient-to-br from-gray-900 to-gray-950 flex-1">
            <div className="w-full h-full m-2 bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-500/20 flex flex-col overflow-hidden">
                {/* Header with glowing accent */}
                <div className="bg-gray-800/90 border-b border-emerald-500/30 p-3 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                    <span className="text-emerald-400 font-medium tracking-wide text-sm">FINPLEXITY AI</span>
                </div>
                
                {/* Chat messages area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent bg-gradient-to-b from-gray-800/50 to-gray-900/50">
                    {messages.length === 0 ? (
                        // Skeleton messages when chat is empty
                        <>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-2xl p-4 bg-gray-700/80 border border-emerald-500/20 backdrop-blur-sm shadow-lg">
                                    <p className="leading-relaxed text-sm text-emerald-100">Hello! I'm your AI Financial Advisor. How can I help you with your financial goals today?</p>
                                </div>
                            </div>
                            <div className="flex justify-end opacity-40">
                                <div className="max-w-[70%] rounded-2xl p-4 bg-gray-600/80 border border-emerald-400/20 backdrop-blur-sm shadow-lg">
                                    <p className="leading-relaxed text-sm text-gray-100">I'd like some advice on investment planning...</p>
                                </div>
                            </div>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-2xl p-4 bg-gray-700/80 border border-emerald-500/20 backdrop-blur-sm shadow-lg">
                                    <p className="leading-relaxed text-sm text-emerald-100">I'd be happy to help you create an investment strategy. Let's start by discussing your financial objectives...</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-2xl p-4 backdrop-blur-sm shadow-lg
                                        ${message.role === 'user'
                                            ? 'bg-gray-600/80 text-gray-100 border border-emerald-400/30 hover:border-emerald-400/50'
                                            : message.role === 'error'
                                                ? 'bg-red-900/50 text-red-200 border border-red-500/50'
                                                : 'bg-gray-700/80 text-emerald-100 border border-emerald-500/30 hover:border-emerald-500/50'
                                        } 
                                        transform hover:scale-[1.01] transition-all duration-300 ease-in-out`}
                                >
                                    <p className="leading-relaxed text-sm">{message.content}</p>
                                    <div className={`h-0.5 w-full mt-2 rounded-full ${message.role === 'user' ? 'bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0' : 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0'}`}></div>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-700/80 rounded-2xl p-4 border border-emerald-500/30 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-duration:600ms]"></div>
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:150ms]"></div>
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:300ms]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat input area */}
                <div className="w-full bg-gray-800/90 p-2 rounded-b-3xl border-t border-emerald-500/30 backdrop-blur-md">
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default AssistantSearch;