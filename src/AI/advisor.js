import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Initialize the chat model
const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    temperature: 0.8,
    maxOutputTokens: 2048,
});

// Create the therapist system prompt
const systemPrompt = `You are a financial advisor specializing in providing unbiased, accurate, and easy-to-understand financial guidance tailored for rural Indian communities. Your primary goal is to help individuals explore safe and suitable investment options, even if they have minimal financial knowledge.
Focus on educating users about savings plans, government-backed investment schemes, mutual funds, and low-risk opportunities that align with their income and goals. Avoid promoting risky ventures, and always prioritize clear explanations over complex jargon.
Whenever possible, include examples relevant to rural India, such as investing in agricultural businesses, cooperative funds, or post office schemes. Guide users in simple steps and suggest practical financial habits they can adopt to improve their financial stability.
If a user's query is unclear, ask follow-up questions to understand their financial background better before providing tailored advice.

Format your responses cleanly with these guidelines:
1. Use proper paragraph breaks for readability
2. Avoid excessive asterisks or emphasis markers
3. Use numbered or bulleted lists for options
4. Keep sentences concise and direct
5. Limit responses to 3-4 paragraphs maximum
6. Present investment options in a clean, structured format
7. Remove any redundant phrases like "That's a great question!"`;

// Function to clean response text
function cleanResponse(text) {
    // Remove excessive asterisks used for emphasis
    let cleaned = text.replace(/\*\*/g, '');
    cleaned = cleaned.replace(/\*/g, '');
    
    // Fix numbered lists formatting - ensure there's a line break before numbered items
    // First, find all instances of a number followed by a dot that might be part of a list
    const numberedListRegex = /(\s)(\d+)\.\s+/g;
    
    // Replace with a line break before the number
    cleaned = cleaned.replace(numberedListRegex, '\n$2. ');
    
    // Handle case where a numbered list starts at the beginning of a paragraph
    // Look for patterns where a number starts at beginning of line or after a period
    cleaned = cleaned.replace(/(^|\.\s+)(\d+)\.\s+/g, '$1\n$2. ');
    
    // Fix bullet points formatting
    cleaned = cleaned.replace(/\s*\*\s+/g, '\n• ');
    
    // Remove redundant phrases
    const redundantPhrases = [
        "That's a great question!",
        "Great question.",
        "That's an excellent question.",
        "I'd be happy to help with that.",
        "I'd be happy to explain.",
        "Let me explain.",
        "Let's explore this together."
    ];
    
    redundantPhrases.forEach(phrase => {
        cleaned = cleaned.replace(new RegExp(phrase, 'gi'), '');
    });
    
    // Trim extra whitespace and normalize spacing
    cleaned = cleaned.replace(/\n\s+/g, '\n');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    
    // Ensure we don't have a line break at the very beginning
    cleaned = cleaned.replace(/^\n+/, '');
    
    // Final cleanup
    cleaned = cleaned.trim();
    
    return cleaned;
}

async function Advisor(userInput) {
    try {
        const messages = [{
            role: "system",
            content: systemPrompt
        }, {
            role: "user",
            content: userInput
        }];

        const response = await model.invoke(messages);
        return cleanResponse(response.content);

    } catch (error) {
        console.error("Error in advisor:", error);
        return "I apologize, but I'm having trouble processing your request.";
    }
}

export default Advisor;