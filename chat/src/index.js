import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import { scrollToBottom } from './js/dom.js';
import { addDataToFirebaseDb, getDataFromFirebaseDb } from './firebase.js';

/**
 * The function saves JSX expressions describing chat messages to an array
 * 
 * @param {Object} props - Properties
 * @param {Array} props.messages - Array of objects that contain information about user messages
 * @returns {Array} - JSX expressions array 
 */
function ChatMessages(props) {
    let jsxMessages = [];

    for (let i = 0; i < props.messages.length; i++) {
        const message = props.messages[i];

        jsxMessages.push(
            <p
                className="chat__message chat__message_margin chat__message_padding"
                key={message.id}
            >
                {message.text}
            </p>
        );
    }

    scrollToBottom();

    return jsxMessages;
}

/**
 * The function renders the user chat
 * 
 * @returns {JSX} - JSX expression describing the chat
 */
function MessagesList() {
    const [messages, setMessages] = useState(getDataFromFirebaseDb());

    /**
     * The function is called when the user sends a message
     * 
     * @param {Event} event 
     */
    function handleSendMessage(event) {
        if (event.key === "Enter") {
            const inputElement = document.getElementById('chatInput');
            const inputText = inputElement.value;
            const id_ = new Date() - 0;
            /**
             * User message object
             * 
             * @type {{id: number, text: string}}
             */
            const newMessage = {
                id: id_,
                text: inputText
            };

            setMessages(messages.concat([newMessage]));
            addDataToFirebaseDb(newMessage);

            inputElement.value = "";
        }
    }

    return (
        <div className="chat">
            <div className="chat__messages chat__messages_margin">
                <ChatMessages messages={messages} />
            </div>
            <div className="chat__input">
                <input
                    className="chat__input__text"
                    id="chatInput"
                    type="text"
                    placeholder="Press Enter to send a Message and see the Message history"
                    onKeyUp={(event) => (handleSendMessage(event))}
                >
                </input>
            </div>
        </div >
    );
}

ReactDOM.render(
    <MessagesList />,
    document.getElementById('root')
);