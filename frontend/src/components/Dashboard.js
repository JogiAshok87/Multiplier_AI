import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from './Header'
import ProgressBar from "./ProgressBar";
import { FaAngleDown,FaAngleUp } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { PiCursorClickFill } from "react-icons/pi";
import { IoCart } from "react-icons/io5";
import { BiUpArrowAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";
import {storeContext} from '../ContextAPI';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", OpenRate: 400, CTR: 240, BounceRate: 100 },
  { name: "Feb", OpenRate: 500, CTR: 290, BounceRate: 150 },
  { name: "Mar", OpenRate: 600, CTR: 350, BounceRate: 200 },
  { name: "Apr", OpenRate: 700, CTR: 400, BounceRate: 250 },
  { name: "May", OpenRate: 800, CTR: 450, BounceRate: 300 },
  { name: "Jun", OpenRate: 900, CTR: 300, BounceRate: 350 },
  { name: "Jul", OpenRate: 300, CTR: 500, BounceRate: 400 },
  { name: "Aug", OpenRate: 800, CTR: 600, BounceRate: 450 },
  { name: "sep", OpenRate: 200, CTR: 800, BounceRate: 500 },
  { name: "oct", OpenRate: 500, CTR: 900, BounceRate: 550 },
  { name: "Nov", OpenRate: 300, CTR: 300, BounceRate: 600 },
  { name: "Dec", OpenRate: 400, CTR: 800, BounceRate: 650 },
];

export default function Dashboard() {
  // const campaignData = [
  //   { label: "Jan", open: 200, ctr: 150, bounce: 100 },
  //   { label: "Feb", open: 400, ctr: 300, bounce: 250 },
  //   { label: "Mar", open: 350, ctr: 250, bounce: 200 },
  //   { label: "Apr", open: 500, ctr: 400, bounce: 300 },
  //   { label: "May", open: 600, ctr: 450, bounce: 350 },
  //   { label: "Jun", open: 700, ctr: 500, bounce: 400 },
  //   { label: "Jul", open: 650, ctr: 480, bounce: 370 },
  //   { label: "Aug", open: 750, ctr: 520, bounce: 420 },
  //   { label: "Sep", open: 800, ctr: 600, bounce: 500 },
  //   { label: "Oct", open: 900, ctr: 680, bounce: 560 },
  //   { label: "Nov", open: 950, ctr: 700, bounce: 600 },
  //   { label: "Dec", open: 1000, ctr: 750, bounce: 650 },
  // ];
  const navigate = useNavigate();
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
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* <Header /> */}
        <header className="flex justify-between items-center mb-6">
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
            
            {isOpen && (
              <div className="absolute top-full right-0 bg-[#fff] rounded-lg shadow-lg w-[150px] p-10 text-center z-50">
                    <button className="w-full bg-red-500 text-white border-0 py-2 px-3 rounded cursor-pointer hover:bg-[#cc0000]" onClick={handleLogout}>Logout</button>
              </div>

            )}
            </div>
          </div>
        </header>

        <ProgressBar />

        {/* Account Approval Banner */}
        <div className="flex items-start bg-[#FCF7FD] rounded-md p-4 mb-4 mt-16">
            <FcOk size={50}  className="mr-2"/>
            <div className="flex flex-col items-start justify-center gap-1">
              <h4 className="text-[#800080] font-semibold text-xl">Your account is approved</h4>
              <p>
              
                Your account has been approved and you can now send up to 100
                emails per month. Need more? Order a plan by clicking the
                upgrade button below.The free plan in cludes 3,000 email per
                month.
              </p>
              <button className="bg-[#800080] text-white p-2 border-none rounded-md font-medium flex items-center gap-1">Get started <FiArrowRight /></button>
            </div>
          </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow flex justify-between">
            <div className="flex flex-col gap-2">
              <MdOutlineMarkEmailUnread
                size={40}
                className="fill-[#fff] bg-[#800080] p-2 rounded-full"
              />
              <p className="text-gray-500">Total Content Generated</p>
              <h2 className="text-xl font-bold">5,189</h2>
            </div>
            <div className="flex flex-col justify-between items-end">
              <BsThreeDotsVertical />
              <p className="text-[#08a124] bg-[#c5efbb] flex items-center w-12 text-xs rounded-md">
                <BiUpArrowAlt />
                100%
              </p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex justify-between">
            <div className="flex flex-col gap-2">
              <PiCursorClickFill
                size={40}
                className="fill-[#fff] bg-[#800080] p-3 rounded-full"
              />
              <p className="text-gray-500">Clicks in Content</p>
              <h2 className="text-xl font-bold">5,671</h2>
            </div>
            <div className="flex flex-col justify-between items-end">
              <BsThreeDotsVertical />
              <p className="text-[#08a124] bg-[#c5efbb] flex items-center w-12 text-xs rounded-md">
                <BiUpArrowAlt />
                100%
              </p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex justify-between">
            <div className="flex flex-col gap-2">
              <IoCart
                size={40}
                className="fill-[#fff] bg-[#800080] p-2 rounded-full"
              />
              <p className="text-gray-500">Carts Recovered</p>
              <h2 className="text-xl font-bold">983</h2>
            </div>
            <div className="flex flex-col justify-between items-end">
              <BsThreeDotsVertical />
              <p className="text-[#08a124] bg-[#c5efbb] flex items-center w-12 text-xs rounded-md">
                <BiUpArrowAlt />
                100%
              </p>
            </div>
          </div>
        </div>

<div className="mt-10">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "20px",
              }}>
              <h4>Your campaigns</h4>
              <select  className="border"
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                
                }}>
                <option value="This year">This year</option>
                <option value="previous year">previous year </option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data} barSize={50}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="OpenRate" stackId="a" fill="#6a0dad" />
                <Bar dataKey="CTR" stackId="a" fill="#c2a3ff" />
                <Bar dataKey="BounceRate" stackId="a" fill="#ddd" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        {/* Last Emails Sent */}
        <div className="p-4 bg-white rounded-lg shadow mt-6">
          <h3 className="text-lg font-semibold mb-2">Last emails</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Campaign</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Emails sent</th>
                <th className="text-left py-2">Open rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Discover our new app features</td>
                <td className="py-2">New app launch</td>
                <td className="py-2 text-green-500">Sent</td>
                <td className="py-2">02/03/2024 at 1:35pm</td>
                <td className="py-2">2,183</td>
                <td className="py-2">35%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Abandoned cart</td>
                <td className="py-2">Automated Email</td>
                <td className="py-2 text-green-500">Sent</td>
                <td className="py-2">02/03/2024 at 1:35pm</td>
                <td className="py-2">2,183</td>
                <td className="py-2">35%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
