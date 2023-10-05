import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

const FloatingTab = ({onClose, onSubmit}:any) => {
  const [info, setInfo] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setInfo(e.target.value)
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
    onClose()
  }
  return (
    <div className='fixed top-1/2 w-[60%] left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gray-800 z-10 border border-gray-400 p-4 rounded shadow-lg'>
      <div className='flex my-auto justify-between'><h1 className='text-white pb-4'>Add Information</h1>
      <button className='pb-4' onClick={onClose}>
            <FiX size={20} className="bg-gray-400 rounded-sm text-red-500"/>
        </button></div>
        <form onSubmit={handleSubmit}>
        <div className='text-center flex flex-col space-y-2'>

<input type="text"
 className='py-2 px-2 rounded-md outline-none bg-white/80 placeholder-gray-500'
  placeholder='Enter news title here...'
  onChange={handleInputChange}
  value={info}/>
<input type="text" className='py-2 px-2 rounded-md outline-none bg-white/80 placeholder-gray-500' placeholder='Enter news subject here...'/>
<input type="text" className='py-2 px-2 rounded-md outline-none bg-white/80 placeholder-gray-500' placeholder='Enter news date here...'/>
</div>
<button type='submit' className='bg-blue-300 rounded-md my-4 text-center px-4 py-2'>Submit</button>
        </form>
        
    </div>
  )
}

export default FloatingTab