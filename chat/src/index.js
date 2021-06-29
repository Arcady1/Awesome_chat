import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';

function scrollToBottom() {
    setTimeout(() => {
        const bottomPos = document.getElementById('content').clientHeight;

        window.scrollTo({
            top: bottomPos,
            behavior: 'smooth'
        });
    }, 100);
}

function ChatMessages(props) {
    let jsxMessages = [];

    for (let i = props.messages.length - 1; i >= 0; i--) {
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

class MessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{
                id: 101,
                text: "Welcome to the Awesome chat!"
            }]
        }
    }

    handleSendMessage(event) {
        if (event.key === "Enter") {
            const inputElement = document.getElementById('chatInput');
            const inputText = inputElement.value;
            const messages = this.state.messages;
            const id_ = new Date() - 0;

            this.setState({
                messages: messages.concat([{
                    id: id_,
                    text: inputText
                }])
            });

            inputElement.value = "";
        }
    }

    render() {
        return (
            <div className="chat">
                <div className="chat__messages chat__messages_margin">
                    <ChatMessages messages={this.state.messages} />
                </div>
                <div className="chat__input">
                    <input
                        className="chat__input__text"
                        id="chatInput"
                        type="text"
                        onKeyUp={(event) => this.handleSendMessage(event)}
                    >
                    </input>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <MessagesList />,
    document.getElementById('root')
);