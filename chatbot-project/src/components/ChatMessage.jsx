import RobotProfilePicture from "../assets/robot.png"
import UserProfilePicture from "../assets/user.png"
import "../styles/ChatMessage.css";

export function ChatMessage({ messege, sender } ){

    return (
        <div className={
                                        sender==="user" 
                                        ? "chat-message-user" 
                                        : "chat-message-robot"
                                    }>
            {sender === "robot" &&  (
                <img src= {RobotProfilePicture} 
                    className="chat-message-profile"
                    ></ img>
            )}
            <div className="chat-message-text">
                {messege}
            </div>
            {sender === "user" &&  (
                <img src={UserProfilePicture} 
                    className="chat-message-profile"
                    ></ img>

            )}
        </div>
    )
}