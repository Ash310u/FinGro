import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatOverview from './ChatOverview';

const Lists = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats([
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
                lastMessageTime: '2 hours ago',
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
                lastMessageTime: '1 day ago',
            }
        ])
    }, [])

    let content = chats.map((chat) => {
        return (
            <Link to={`/chat/${chat.id}`} key={chat.id} className="block">
                <ChatOverview chat={chat} />
            </Link>
        )
    })
    
    return (
        <div className="w-72 bg-gray-900/80 backdrop-blur-lg border-r border-gray-800/50">
            <div className="flex flex-col m-2 p-2">
                <div className="flex flex-col">
                    <Link to="/" className="block">
                        <div className="font-bold text-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent p-4 flex items-center">
                            <span className="relative">
                                FinGrow
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-400 to-cyan-400 blur-sm"></span>
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-400 to-cyan-400"></span>
                            </span>
                        </div>
                    </Link>
                    <div className="space-y-1">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lists;