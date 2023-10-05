import React from 'react';

export interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`py-4 px-4  rounded-xl  ${isUser ? "bg-gray-300  text-right" : "bg-green-400 text-left"}`}>
      {text}
    </div>
  );
}

export default Message;
