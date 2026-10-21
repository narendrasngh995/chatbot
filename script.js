// DOM elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Chatbot responses database
const responses = {
    greetings: [
        "Hello! How can I help you today?",
        "Hi there! What can I do for you?",
        "Hey! How may I assist you?"
    ],
    goodbye: [
        "Goodbye! Have a great day!",
        "See you later! Take care!",
        "Bye! Feel free to come back anytime!"
    ],
    thanks: [
        "You're welcome!",
        "Happy to help!",
        "My pleasure!",
        "Anytime!"
    ],
    help: [
        "I'm here to chat with you! You can ask me about various topics, or just have a casual conversation.",
        "I can help answer questions, have conversations, or just chat! What would you like to talk about?"
    ],
    name: [
        "I'm a simple chatbot created to assist you!",
        "I'm your virtual assistant. Nice to meet you!"
    ],
    hobbies: [
        "I enjoy chatting with people like you!",
        "I love learning new things from our conversations!"
    ],
    time: [
        `The current time is ${new Date().toLocaleTimeString()}.`,
        `It's ${new Date().toLocaleTimeString()} right now.`
    ],
    date: [
        `Today is ${new Date().toLocaleDateString()}.`,
        `The date today is ${new Date().toLocaleDateString()}.`
    ],
    weather: [
        "I'm sorry, I don't have access to weather information. Try checking a weather website!",
        "I can't check the weather, but I hope it's nice where you are!"
    ],
    joke: [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What do you call a bear with no teeth? A gummy bear!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "What do you call a fake noodle? An impasta!"
    ],
    default: [
        "That's interesting! Tell me more.",
        "I see. Can you elaborate on that?",
        "Hmm, I'm not sure about that. Can you ask something else?",
        "That's a good question! I'm still learning, so I might not have the best answer.",
        "I understand. What else would you like to know?"
    ]
};

// Keyword patterns for matching user input
const patterns = {
    greetings: /\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/i,
    goodbye: /\b(bye|goodbye|see you|farewell|take care)\b/i,
    thanks: /\b(thank you|thanks|appreciate|grateful)\b/i,
    help: /\b(help|assist|support|what can you do)\b/i,
    name: /\b(your name|who are you|what are you)\b/i,
    hobbies: /\b(hobby|hobbies|like to do|interests)\b/i,
    time: /\b(time|what time)\b/i,
    date: /\b(date|what day|today)\b/i,
    weather: /\b(weather|temperature|forecast)\b/i,
    joke: /\b(joke|funny|make me laugh)\b/i
};

// Get random response from array
function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Get bot response based on user input
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Check for patterns
    for (const [key, pattern] of Object.entries(patterns)) {
        if (pattern.test(message)) {
            return getRandomResponse(responses[key]);
        }
    }

    // Default response
    return getRandomResponse(responses.default);
}

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';

    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'typing-indicator';
    indicatorDiv.innerHTML = '<span></span><span></span><span></span>';

    typingDiv.appendChild(indicatorDiv);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Handle sending message
function handleSendMessage() {
    const message = userInput.value.trim();

    if (message === '') return;

    // Add user message
    addMessage(message, true);
    userInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate bot thinking time
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
    }, 500 + Math.random() * 1000); // Random delay between 0.5-1.5 seconds
}

// Event listeners
sendButton.addEventListener('click', handleSendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Focus input on load
userInput.focus();
