import React,{useContext,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { FaAngleDown,FaAngleUp } from "react-icons/fa6";
import {storeContext} from '../ContextAPI';

const Header = () => {

    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    const { logout } = useContext(storeContext)
    const toggleDropdown = () =>{
          setIsOpen((prev)=>!prev)
    }

    
    const handleLogout = () =>{
        logout();
        navigate('/login');
      }
    
  return (
    
        <div className="flex justify-between items-center mb-10  py-2 w-full">
                  <h1 className="text-xl font-semibold">Welcome, Marc</h1>
                  <div className="relative flex gap-10">
                    <input
                      type="text"
                      placeholder="Search here"
                      className="border rounded px-4 py-2 text-sm w-64"
                    />
                    <div className="flex flex-row items-center gap-3 cursor-pointer" onClick={toggleDropdown}>
                      <button className="bg-[#FA7F18] text-white border-none rounded-full p-2">
                        MJ
                      </button>
                      <div className="flex flex-col">
                        <p>Marc Jacob</p>
                        <p>marco@gmail.com</p>
                      </div>
                      <div >
                       {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                    {/*Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full right-0 bg-[#fff] rounded-lg shadow-lg w-[150px] p-10 text-center z-50">
                            <button className="w-full bg-red-500 text-white border-0 py-2 px-3 rounded cursor-pointer hover:bg-[#cc0000]" onClick={handleLogout}>Logout</button>
                      </div>
        
                    )}
                    </div>
                  </div>
                </div>
    
  )
}

export default Header