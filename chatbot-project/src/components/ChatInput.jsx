import { useState } from 'react'
import {Chatbot  } from "supersimpledev"
import LoadingSpinner from "../assets/loading-spinner.gif"
import "../styles/ChatInput.css";
export function ChatInput({chatMessages, setChatMessages}) {
                const [inputText, setInputText] = useState("")
                const [isLoading, setIsLoading] = useState(0)


                function saveInputText(event){
                    
                    setInputText(event.target.value);
                    };
                
                function handleKeyDown(event){
                    if (event.key === "Enter"){
                        sendMessage();
                    }
                    if (event.key === "Escape"){
                        setInputText("");
                    }
                };

                async function sendMessage(){
                    if (inputText ==="" || isLoading){
                        return;
                    }
                    const newChatMessages = [
                        ...chatMessages, {
                        messege: inputText,
                        sender: "user",
                        id: crypto.randomUUID()
                        }
                        ];

                    setChatMessages(newChatMessages);
                    setIsLoading(1);
                    setInputText("");
                    const beforeResponse =  {
                        messege: <img className="loading-spinner" src={LoadingSpinner} />,
                        sender: "robot",
                        id: crypto.randomUUID()
                        };
                    setChatMessages([
                        ...newChatMessages, beforeResponse]);
                    const response =  await Chatbot.getResponseAsync(inputText);
                    // setChatMessages([
                    //     ...newChatMessages, {
                    //     messege: response,
                    //     sender: "robot",
                    //     id: crypto.randomUUID()
                    //     }
                    //     ]);
                    beforeResponse.messege = response;
                    setChatMessages([
                        ...newChatMessages, beforeResponse]);
                    setIsLoading(0);
                };

                return (
                    <div className="chat-input-container">
                        <input 
                            placeholder="Send a messege to chatbot" 
                            size="30" 
                            onChange={saveInputText}
                            onKeyDown={handleKeyDown}
                            value={inputText}
                            className="chat-input"
                        />
                        <button 
                        onClick={sendMessage}
                        className="send-button">Send</button>
                    </div>
                );
        }