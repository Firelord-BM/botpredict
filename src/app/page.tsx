"use client";
import React, { useState, KeyboardEvent, FormEvent } from 'react';
import ChatBox from "@/app/component/ChatBox"
import Message,{MessageProps} from './component/Message';
import MenuBar from './component/layout/MenuBar';
import FloatingTab from './component/FloatingTab';
import Image from 'next/image';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([
    { text: "Hello bot", isUser: true },
    { text: "Hi User, ask a question", isUser: false },
    
  ]);

  const [userMessage, setUserMessage] = useState<string>("");
  const [isAddingInformation, setIsAddingInformation] = useState<boolean>(false)
  const [addedInformation, setAddedInformation] = useState<string>("Title Here...")

  const addMessage = (text: string, isUser: boolean) => {
    console.log("Adding message:", text)
    setMessages(prevMessages => [...prevMessages, { text, isUser }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleSubmit(e);
    }
  }

  const handleAddInformation = () => {
    setIsAddingInformation(true)
  };

  const handleCloseFloatingTab = () => {
    setIsAddingInformation(!isAddingInformation)
  }

  const handleInformationSubmit = (info:string) => {
    setAddedInformation(info);
    setIsAddingInformation(false);
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userMessage.trim() !== "") {
      addMessage(userMessage, true);
      setUserMessage("");

      try {
        const data = {
          title: 'Scientists Discover New Species of Rainbow-Colored Butterflies',
          text: userMessage,
          subject: 'scienceNews',
          date: 'September 30, 2023'
        };

        const response = await fetch('https://barasa.pythonanywhere.com/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error("An error occurred");
        }

        const responseData = await response.json();
        addMessage(responseData.prediction, false);
      } catch (error) {
        console.error("Error:", error);
        addMessage("Sorry, there was an error. Please try again.", false);
      }
    }
  }

  return (
    <div className='h-screen flex flex-col justify-between'>
      <MenuBar onAddInformationClick={handleAddInformation}/>
      {isAddingInformation && <FloatingTab onClose={handleCloseFloatingTab} onSubmit={handleInformationSubmit}/>}

      {addedInformation && (<div className='font-bold text-center text-2xl px-4'>{addedInformation}</div>)}
      <div className='flex  justify-center items-end flex-1'>
        <ChatBox messages={messages} />
      </div>
      <form className="w-full flex justify-center items-end pb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full max-w-xl shadow-xl outline-none px-4 py-2 border border-gray-300 rounded"
          placeholder="Type a message..."
          value={userMessage}
          onChange={(event) => setUserMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type='submit' className='bg-blue-300 rounded-md px-4 py-2 ml-2'>Send</button>
      </form>
    </div>
      
    
  )
}

export default Home;
