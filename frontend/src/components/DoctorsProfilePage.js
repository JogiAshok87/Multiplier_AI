import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { GrTwitter } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const DoctorsProfilePage = () => {
    const [oncologist,setOncologist] = useState("")
    const [generalMedicine,setGeneralMedicine] = useState("")
    const [others,setOther] = useState("")

    const location = useLocation()
        const doctor = location.state?.doctor
        console.log("Specified Selected Doctor :",doctor)

    useEffect(() => {
        
        setOncologist(doctor.oncologist_percent)
        setGeneralMedicine(doctor.general_med_percent)
        setOther(doctor.others_percent)
        
    },[] )
   
    const data = [
        { name: "Oncologist", value: oncologist} ,
        { name: "General_Medicine", value: generalMedicine },
        { name: "Others", value: others}
      ];
      
      const COLORS = ["#800080","#C9A0CE", "#E4D7E6"];
        
  return (
    <div>
        <header className='bg-[#800080] flex justify-between px-10 py-8'>
        <h2 className="text-white font-normal text-lg mr-1">
          MULTIPLIER <span className="bg-white text-[#7116AC] px-3 py-1 rounded-full">AI</span>
        </h2>
        <Link to="/HCPdashboard"><p className='text-xl text-white flex items-center gap-1 cursor-pointer'><IoMdArrowRoundBack />Back</p></Link>
        </header>
        <div className='flex  gap-6 mb-10'>
        <div className='bg-[#800080] mt-10 p-14 w-2/6 rounded-tr-3xl rounded-br-3xl'>

            <img src="doctorsProfile.png" className='rounded-xl'/>
            <h2 className='text-white text-xl pt-4'>{doctor.doctor_name}</h2>
            <p className='text-white pt-1'>{doctor.speciality}</p>
            <p className='text-white'>Breast cancer, Cancer prevention</p>

            <p className='text-white pt-5'>University of California, Irvine</p>
            <p className='text-white'>Irvine, CA</p>
            <div className='flex items-center gap-5 pt-10'>
            <BsFacebook className='fill-white' size={30}/>
            <FaInstagramSquare className='fill-white' size={30}/>
            <IoLogoYoutube className='fill-white' size={30}/>
            <GrTwitter className='fill-white' size={30}/>
            <FaLinkedinIn className='fill-white' size={30}/>
            </div>
        </div>
        <div className='w-[calc(100%-100px)] mt-10 mr-5'>
            <div className='flex justify-center items-center pb-10'>
                <PieChart width={600} height={400}>
                <Pie
                    data={data}
                    cx={275}
                    cy={120}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ marginBottom: "60px" }} />
                </PieChart>
            </div>
            <h2 className='text-xl pb-2 '>Content Focus</h2>
            <ul className='bg-[#F9F9FB] px-10 py-8 rounded-xl list-disc'>
                <li>{doctor.Focus1}</li>
                <li>{doctor.Focus2}</li>
                <li>{doctor.Focus3}</li>
                <li>{doctor.Focus4}</li>
                <li>{doctor.Focus5}</li>
            </ul>

            <div className='flex  gap-4 mt-8'>
                <div>
                    <h1 className='text-xl pb-2'>Notable Publications</h1>
                    <ul className='bg-[#F9F9FB] px-10 py-8 rounded-xl list-disc'>
                        <li>{doctor.publication1}</li>
                        <li>{doctor.publication2}</li>
                        <li>{doctor.publication3}</li>
                        <li>{doctor.publication4}</li>
                    </ul>
                </div>

                <div>
                    <h1 className='text-xl pb-2'>Education</h1>
                    <ul className='bg-[#F9F9FB] px-10 py-8 rounded-xl list-disc'>
                        <li>Bachelor of Arts in Biology from Stanford University</li>
                        <li>Doctor of Medicine from University of California, Davis, School of Medicine</li>
                        <li>Fellowship in Breast Surgical Oncology at University of California, Los Angeles, Jonsson Comprehensive Cancer Center</li>
                        <li>Board Certification in Surgery</li>
                    </ul>
                </div>
            </div>
            <div className='mt-4 '>
                <h2 className='text-xl pb-2'>Co-Authorship Network</h2>
                <ul className='bg-[#F9F9FB] px-10 py-8 rounded-xl list-disc'>
                    <li>{doctor.Auth1}</li>
                    <li>{doctor.Auth2}</li>
                    <li>{doctor.Auth3}</li>
                    <li>{doctor.Auth4}</li>
                </ul>
            </div>
            <div className='mt-4'>
                <h2 className='text-xl pb-2'>Peer Recognition</h2>
                <ul className='bg-[#F9F9FB] px-10 py-8 rounded-xl list-disc'>
                    <li>{doctor.peer1}</li>
                    <li>{doctor.peer2}</li>
                    <li>{doctor.peer3}</li>
                    <li>{doctor.peer4}</li>
                    <li>{doctor.peer5}</li>
                    
                </ul>
            </div>
            <div className='flex gap-8 mt-6'>
                <div className='w-full'>
                    <h2 className='text-xl pb-2'>Total publications</h2>
                    <p className='bg-[#F9F9FB] px-10 py-4 rounded-xl list-disc '>{doctor.number_of_publications}</p>
                </div>
                <div className='w-full'>
                    <h2 className='text-xl pb-2'>Total Clinical Trails</h2>
                    <p className='bg-[#F9F9FB] px-10 py-4 rounded-xl list-disc '>{doctor.number_of_trials}</p>
                </div>
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default DoctorsProfilePage