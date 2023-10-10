"use client";
import React, { useState, KeyboardEvent, FormEvent, useEffect } from "react";
import { BiSolidSend } from "react-icons/bi";
import Loading from "./component/Loading/Loading";
import ChatBox from "@/app/component/ChatBox";
import { MessageProps } from "./component/Message";
import MenuBar from "./component/layout/MenuBar";
import FloatingTab from "./component/FloatingTab";
import Image from "next/image";
import TypingAnimation from "./component/TypingAnimation";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([
    { text: "Hello bot", isUser: true },
    { text: "Hi User, ask a question", isUser: false },
  ]);

  const [userMessage, setUserMessage] = useState<string>("");
  const [isAddingInformation, setIsAddingInformation] =
    useState<boolean>(false);
  const [addedInformation, setAddedInformation] =
    useState<string>("Title Here...");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const inactiveIconStyle = {
    color: "gray",
    
  }

  const activeIconStyle ={
    color: "black"
  }
  useEffect(() => {
    setDisabledButton(userMessage.trim() ==="")
  }, [userMessage]);

  const addMessage = (text: string, isUser: boolean) => {
    console.log("Adding message:", text);
    setMessages((prevMessages) => [...prevMessages, { text, isUser }]);

    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo(0, messageContainer.scrollHeight);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleSubmit(e);
    }
  };

  const handleAddInformation = () => {
    setIsAddingInformation(true);
  };

  const handleCloseFloatingTab = () => {
    setIsAddingInformation(!isAddingInformation);
  };

  const handleInformationSubmit = (info: string) => {
    setAddedInformation(info);
    setIsAddingInformation(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userMessage.trim() !== "") {
      addMessage(userMessage, true);
      setUserMessage("");

      try {
        const data = {
          title:
            "Scientists Discover New Species of Rainbow-Colored Butterflies",
          text: userMessage,
          subject: "scienceNews",
          date: "September 30, 2023",
        };
        setLoading(true)
        const response = await fetch(
          "https://barasa.pythonanywhere.com/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("An error occurred");
        }

        const responseData = await response.json();
        addMessage(responseData.prediction, false);
      } catch (error) {
        console.error("Error:", error);
        addMessage("Sorry, there was an error. Please try again.", false);
      } finally{
        setLoading(false)
      }
    }
  };

  return (
    <main className="h-screen bg-gray-900 flex flex-col justify-between">
      <div>
        <MenuBar onAddInformationClick={handleAddInformation} />
        {addedInformation && (
          <div className="font-bold text-center text-white text-2xl  p-4">
            {addedInformation}
          </div>
        )}
        <div className="">
          {isAddingInformation && (
            <FloatingTab
              onClose={handleCloseFloatingTab}
              onSubmit={handleInformationSubmit}
            />
          )}
        </div>
      </div>
     
      <div className="">
        <div className="flex-1 mx-auto max-w-[47%] overflow-y-auto">
          <ChatBox messages={messages} />
          {loading && <div>
            <div className="bg-gray-800 rounded-md p-4 max-w-sm"><TypingAnimation/></div>
            </div>}
        </div>

        <form
          className="flex justify-center items-end mt-4 pb-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full max-w-xl shadow-xl outline-none px-4 py-2 border border-gray-300 rounded"
            placeholder="Type a message..."
            value={userMessage}
            onChange={(event) => setUserMessage(event.target.value)}
            onKeyDown={handleKeyDown}
          />
<div className="-translate-x-20 my-auto"><div>
{disabledButton ? (
            <button
              type="submit"
              className=" rounded-md px-4 py-2 ml-2"
            >
              <BiSolidSend style={inactiveIconStyle} className="" size={23} />
            </button>
          ) : (
            <button
              type="submit"
              className=" rounded-md bg-green-400 px-4 py-1 ml-2"
            >
              <BiSolidSend style={activeIconStyle} className="" size={23} />
            </button>
          )}</div></div>
          
        </form>
      </div>
    </main>
  );
};

export default Home;

