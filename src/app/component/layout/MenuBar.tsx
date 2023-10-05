"use client"
import React,{useState} from "react";
import { FiMenu, FiX } from "react-icons/fi";
import FloatingTab from "../FloatingTab";
const MenuBar = ({onAddInformationClick}:any) => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showFloatingTab, setShowFloatingTab] = useState<boolean>(false);
    const toggleDropdown = () =>{
        setShowDropdown(!showDropdown)
    }
    const toggleFloatingTab = () => {
      setShowFloatingTab(!showFloatingTab)
    }


  return <div className="flex justify-end pt-6 pr-8 ">
   <button onClick={toggleDropdown} className={` rounded-md shadow-2xl ${showDropdown?"text-red-600 bg-slate-200":"bg-stone-800 text-white"}`}>
    {showDropdown ? <FiX size={35}/>:<FiMenu size={35}/>}
   </button>
   {showDropdown && (<div >
    {/* {Options.map((items, index)=>(<div key={index} onClick={toggleFloatingTab}>
    {items.name}
   </div>))} */}
<div className="bg-white/70 shadow-lg z-10 px-4 py-2 rounded-xl flex flex-col absolute right-28 space-y-4" >
<h1 onClick={onAddInformationClick} className="hover:cursor-pointer">Add Information</h1>
   <h1 className="hover:cursor-pointer">Clear Chat</h1>
   <h1 className="hover:cursor-pointer">ChangeLog</h1>
</div>
  
   
   </div>)}
   {showFloatingTab && 
    <FloatingTab onClose={toggleFloatingTab}/>}
  </div>;
};

export default MenuBar;
