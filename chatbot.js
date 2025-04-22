const API_KEY = 'AIzaSyAK8obivhQ8T9mF-dGC-SnaZ7GutGQF4e0';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeChat();
});

function initializeChat() {
    // Add welcome message
    addMessage('bot', 'Hello! I am your Indian Election Assistant. I can help you with:'
        + '\n\n• Historical election data and statistics'
        + '\n• Political party manifestos and policies'
        + '\n• Election procedures and rules'
        + '\n• Current political scenarios'
        + '\n• State-wise election analysis'
        + '\n• Voter demographics and turnout data'
        + '\n• Election commission guidelines'
        + '\n• Political party histories and ideologies'
        + '\n\nWhat would you like to know?');

    // Set up event listeners
    setupEventListeners();
}

function setupEventListeners() {
    const input = document.getElementById('userInput');
    const sendButton = document.querySelector('.send-button');

    // Handle Enter key press
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Handle send button click
    sendButton.addEventListener('click', sendMessage);
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Clear input and disable it while processing
    input.value = '';
    input.disabled = true;
    
    // Add user message to chat
    addMessage('user', message);

    try {
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are an Indian Election Assistant with expertise in Indian politics and elections. Your role is to provide accurate, detailed information about:

1. Historical election data and statistics
2. Political party manifestos and policies
3. Election procedures and rules
4. Current political scenarios
5. State-wise election analysis
6. Voter demographics and turnout data
7. Election commission guidelines
8. Political party histories and ideologies

Please provide detailed, factual information about: ${message}

Format your response with:
- Clear headings and subheadings
- Bullet points for lists
- Relevant statistics and data
- Historical context when applicable
- Sources or references when possible

Keep the response informative but concise.`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator(typingIndicator);
        
        // Add bot response
        const botReply = data.candidates[0]?.content?.parts[0]?.text || 
                        "I apologize, but I couldn't process your request at the moment. Please try again.";
        
        addMessage('bot', botReply);
    } catch (error) {
        console.error('Error:', error);
        // Remove typing indicator in case of error
        removeTypingIndicator(typingIndicator);
        addMessage('bot', "I'm sorry, there was an error processing your request. Please try again later.");
    } finally {
        // Re-enable input
        input.disabled = false;
        input.focus();
    }
}

function formatMessage(text) {
    // Convert markdown-style formatting to HTML
    let formattedText = text
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic text
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="chat-link">$1</a>')
        // Lists
        .replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>')
        // Headers
        .replace(/^#\s+(.*)$/gm, '<h3 class="chat-header">$1</h3>')
        // Line breaks
        .replace(/\n/g, '<br>');

    // Wrap lists in ul tags
    formattedText = formattedText.replace(/(<li>.*?<\/li>)+/g, '<ul class="chat-list">$&</ul>');

    return formattedText;
}

function addMessage(sender, text) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-sender">${sender === 'user' ? 'You' : 'Assistant'}</div>
            <div class="message-text">${formatMessage(text)}</div>
        </div>
    `;
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    const messagesDiv = document.getElementById('messages');
    
    // Remove any existing typing indicator
    const existingIndicator = messagesDiv.querySelector('.typing-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    messagesDiv.appendChild(indicator);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    return indicator;
}

function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
        indicator.style.opacity = '0';
        indicator.style.transition = 'opacity 0.3s ease-out';
        
        setTimeout(() => {
            if (indicator && indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 300);
    }
} 