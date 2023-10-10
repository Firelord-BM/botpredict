import React from 'react'
import Message, { MessageProps } from './Message';

interface ChatBoxProps {
  messages: MessageProps[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className='space-y-2 py-2  mb-4'>
      {messages.map((message, index) => (
        <Message key={index} text={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
}

export default ChatBox;