import React from 'react'
import Message, { MessageProps } from './Message';

interface ChatBoxProps {
  messages: MessageProps[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className='w-[100%] flex flex-col space-y-2 max-w-2xl mb-4'>
      {messages.map((message, index) => (
        <Message key={index} text={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
}

export default ChatBox;