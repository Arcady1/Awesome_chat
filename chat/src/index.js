import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import { scrollToBottom } from './js/dom.js';

function ChatMessages(props) {
    let jsxMessages = [];

    for (let i = 0; i < props.messages.length; i++) {
        const message = props.messages[i];

        jsxMessages.push(
            <p className="chat__message chat__message_margin chat__message_padding" key={message.id}>
                {message.text}
            </p>
        );
    }

    scrollToBottom();

    return jsxMessages;
}

function MessagesList() {   
    const [messages, setMessages] = useState(
        [{
            id: 101,
            text: "Welcome to the Awesome chat!"
        }]
    );

    function handleSendMessage(event) {
        if (event.key === "Enter") {
            const inputElement = document.getElementById('chatInput');
            const inputText = inputElement.value;
            const id_ = new Date() - 0;

            setMessages(
                messages.concat([{
                    id: id_,
                    text: inputText
                }])
            )

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
                    placeholder="Press Enter to send the Message"
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