import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatInput from './ChatInput';
import Advisor from '../AI/advisor';

const AssistantSearch = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { chatId } = useParams();
    const navigate = useNavigate();

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load chat data based on chatId
    useEffect(() => {
        const loadChatData = async () => {
            if (chatId) {
                try {
                    const dummyChats = [
                        {
                            id: 1,
                            title: 'Do have to pay tax on my investment gains if i have more than 1 lakh in my demat account?',
                            chatList: [
                                {
                                    user: 'user',
                                    message: 'Do have to pay tax on my investment gains if i have more than 1 lakh in my demat account?',
                                },
                                {
                                    user: 'assistant',
                                    message: `Yes, you have to pay tax on your investment gains if you have more than ₹1 lakh in your Demat account, but the tax depends on the type of gains:
                                                1. Short-Term Capital Gains (STCG): If you sell stocks or mutual funds within 1 year, you pay 15% tax on the gains.
                                                2. Long-Term Capital Gains (LTCG): If you sell stocks or mutual funds after 1 year, you pay 10% tax on gains exceeding ₹1 lakh in a financial year (without indexation).
                                            So, the ₹1 lakh limit applies to long-term gains. If your total LTCG exceeds ₹1 lakh in a year, only the amount above ₹1 lakh is taxed.`,
                                }
                            ],
                        },
                        {
                            id: 2,
                            title: 'What are the best investment options in India as an 20 year old',
                            chatList: [
                                {
                                    user: 'user',
                                    message: 'What are the best investment options in India as an 20 year old',
                                },
                                {
                                    user: 'assistant',
                                    message: `Sure! Here's a quick list of investment options:
                                            1. Equity Mutual Funds
                                            2. Stocks  
                                            3. Index Funds  
                                            4. Public Provident Fund (PPF)  
                                            5. Fixed Deposits (FD)  
                                            6. Sovereign Gold Bonds (SGB)  
                                            7. National Pension Scheme (NPS)  
                                            8. Real Estate  
                                            9. Systematic Investment Plan (SIP)  
                                            10. Digital Gold  
                                            11. Exchange-Traded Funds (ETFs)  
                                            12. Cryptocurrency  

                                            Let me know if you want more info on any!`,
                                }
                            ],
                        }
                    ];

                    const selectedChat = dummyChats.find(chat => chat.id === parseInt(chatId));
                    
                    if (selectedChat) {
                        // Convert the chat format to match our messages state
                        const formattedMessages = selectedChat.chatList.map(item => ({
                            role: item.user,
                            content: item.message
                        }));
                        
                        setMessages(formattedMessages);
                    } else {
                        // Handle chat not found
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error loading chat:', error);
                }
            } else {
                // Clear messages for new chat
                setMessages([]);
            }
        };

        loadChatData();
    }, [chatId, navigate]);

    const handleSendMessage = async (messageText) => {
        try {
            setIsLoading(true);

            // Add user message to chat
            const userMessage = {
                role: 'user',
                content: messageText,
            };
            setMessages(prev => [...prev, userMessage]);

            // For a new chat, create a new chat and navigate to it
            // if (!chatId) {
                // navigate(`/chat/${dummyChats.length + 1}`);
            // }

            const advisorResponse = await Advisor(messageText);
            
            const aiMessage = {
                role: 'assistant',
                content: advisorResponse.content,
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
        <div className="h-screen flex items-center justify-center p-2 bg-gray-50 flex-1">
            <div className="w-full h-full m-2 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-3 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-700 font-medium tracking-wide text-sm">FinGro AI Advisor</span>
                </div>
                
                {/* Chat messages area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white">
                    {messages.length === 0 ? (
                        // Skeleton messages when chat is empty
                        <>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-lg p-4 bg-gray-100 border border-gray-200 shadow-sm">
                                    <p className="leading-relaxed text-sm text-gray-700">Hello! I'm your AI Financial Advisor. How can I help you with your financial goals today?</p>
                                </div>
                            </div>
                            <div className="flex justify-end opacity-40">
                                <div className="max-w-[70%] rounded-lg p-4 bg-blue-50 border border-blue-100 shadow-sm">
                                    <p className="leading-relaxed text-sm text-gray-700">I'd like some advice on investment planning...</p>
                                </div>
                            </div>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-lg p-4 bg-gray-100 border border-gray-200 shadow-sm">
                                    <p className="leading-relaxed text-sm text-gray-700">I'd be happy to help you create an investment strategy. Let's start by discussing your financial objectives...</p>
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
                                    className={`max-w-[70%] rounded-lg p-4 shadow-sm
                                        ${message.role === 'user'
                                            ? 'bg-blue-50 text-gray-800 border border-blue-100'
                                            : message.role === 'error'
                                                ? 'bg-red-50 text-red-800 border border-red-100'
                                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                                        } 
                                        transition-all duration-200 ease-in-out`}
                                >
                                    <p className="leading-relaxed text-sm">{message.content}</p>
                                    <div className={`h-0.5 w-full mt-2 rounded-full ${message.role === 'user' ? 'bg-gradient-to-r from-blue-100/0 via-blue-100 to-blue-100/0' : 'bg-gradient-to-r from-gray-200/0 via-gray-200 to-gray-200/0'}`}></div>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:150ms]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:300ms]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat input area */}
                <div className="w-full bg-white p-2 rounded-b-lg border-t border-gray-200">
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default AssistantSearch;