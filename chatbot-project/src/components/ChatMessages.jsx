import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import "../styles/ChatMessages.css";

function useAutoScroll(dependencies){
    const containerRef = useRef(null );

    useEffect(
        () => {
            const containerElem = containerRef.current;
            if (containerElem){
                containerElem.scrollTop = containerElem.scrollHeight;
            }   
        }, [dependencies]);
    return containerRef;
};

export function ChatMessages({chatMessages}){
    const chatMessagesRef = useAutoScroll(chatMessages);
    

    const chatMessagesComponents = chatMessages.map((chatMessege) => {
        return (
            <ChatMessage 
                messege={chatMessege.messege} 
                sender={chatMessege.sender}
                key={chatMessege.id}
            />
        );
    });
    return (
        <div className="chat-message-container"
                ref={chatMessagesRef}>
                {chatMessagesComponents.length === 0 
                    ? (
                        <p className="no-messages">
                            Welcome to the chatbot project! Send a messege to get started.
                            </ p>
                        ) 
                    :chatMessagesComponents}
            </div>
    );
}