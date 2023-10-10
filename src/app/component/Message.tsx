import React from "react";

export interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`space-y-2 text-white flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`relative ${isUser ? "bg-green-700" : "bg-gray-700"} p-4 rounded-lg max-w-[60%]`}>
        {text}
        <div className={`absolute bottom-0 ${isUser ? "right-0" : "left-0"} w-0 h-0 border-4 border-solid border-transparent ${isUser ? "border-green-700 border-t-0 border-r-0" : "border-gray-700 border-t-0 border-l-0"}`} />
      </div>
    </div>
  );
};

export default Message;
