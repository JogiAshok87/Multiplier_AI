import React,{ useState,useEffect } from "react";
import { UploadCloud, Search, ChevronDown } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import Sidebar from "./Sidebar"
import ProgressBar from "./ProgressBar";
import axios from "axios"
import Header from './Header'

const doctors = [
  { name: "Dr. John Doe", speciality: "Cardiologist", location: "New York, USA", experience: 15, status: "Unique" },
  { name: "Dr. Jane Smith", speciality: "Dermatologist", location: "Los Angeles, USA", experience: 10, status: "Duplicate" },
  { name: "Dr. Mark Lee", speciality: "Orthopedic", location: "Chicago, USA", experience: 8, status: "Preloaded" },
  { name: "Dr. Emily Davis", speciality: "Pediatrician", location: "Houston, USA", experience: 12, status: "Unique" },
  { name: "Dr. Chris Brown", speciality: "Neurologist", location: "Phoenix, USA", experience: 20, status: "Duplicate" },
  { name: "Dr. Sarah Wilson", speciality: "Gynecologist", location: "Philadelphia, USA", experience: 7, status: "Preloaded" },
  { name: "Dr. Michael Johnson", speciality: "Oncologist", location: "San Antonio, USA", experience: 9, status: "Unique" },
];

export default function HCPDashboard() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [doctorsData,setDoctorsData] =useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    speciality: "",
    location: "",
    experience: "",
    status: "",
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFile(files)
  };

  useEffect( ()=>{

    const fetchData = async() =>{
      try{
        const resposne = await axios.get("http://127.0.0.1:5000/registeredDoctors")
  
        if (resposne.status === 200){
          // console.log("resposne from backend",resposne.data)
          setDoctorsData(resposne.data)
        }
  
      }catch(error){
        console.log("server Error :", error)
      }
    }

    fetchData()
  },[])

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      speciality: "",
      location: "",
      experience: "",
      status: "",
    });
    setSearchTerm("");
  };

  const filteredDoctors = doctorsData.filter((doctor) => {
    const experienceNumber = parseInt(doctor.experience)
    return (
      doctor.doctor_Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.speciality ? doctor.speciality === filters.speciality : true) &&
      (filters.location ? doctor.location === filters.location : true) &&
      (filters.experience ? experienceNumber >= parseInt(filters.experience) : true) &&
      (filters.status ? doctor.status === filters.status : true)
    );
  });

  





  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, Marc</h1>
          <div className="flex gap-10">
          <input type="text" placeholder="Search here" className="border rounded px-3 py-2 text-sm" />

          <div className="flex flex-row items-center gap-3">
                        <button className="bg-[#FA7F18] text-white border-none rounded-full p-2">MJ</button>
                        <div className="flex flex-col">
                          <p>Marc Jacob</p>
                          <p>marco@gmail.com</p>
                        </div>
                        <FaAngleDown />
                      </div>
                      </div>
        </header> */}
        <Header />
        <ProgressBar />

        {/* HCP Data Import */}
        <div className="p-6 text-center border rounded-lg shadow-md mb-6 mt-16">
          <h2 className="text-lg font-semibold text-[#800080]">HCP Data Import</h2>
         
          <label htmlFor="file-upload" className="border-dashed border-2 border-gray-400 p-6 rounded-md mt-4 flex flex-col items-center cursor-pointer">
              <UploadCloud className="w-10 h-10 text-gray-500" />
              <p className="text-gray-500 mt-2">
                Drag & Drop or <span className="text-[#800080]">Choose File</span> to upload
              </p>
              {selectedFile.length > 0 && (
            <div className="mt-2 text-sm font-semibold">
              {selectedFile.map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
            </div>
            )}
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
          </label>
        </div>

        {/* HCP List */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#800080]">HCP List</h2>
          <a href="#" className="text-[#800080]">Add HCPs</a>
        </div>
        <p className="text-gray-500 mb-4">View all registered doctors</p>

        {/* Search and Filters */}
        <div className="flex justify-between space-x-2 mb-4">
          <div className="flex space-x-2"> 
          <div className="relative  w-1/3 flex items-center">
            <Search className="absolute left-2 top-3 w-4 h-4 text-gray-500" />
            <input type="search" placeholder="Search doctors" className="pl-8 w-full border rounded px-2 py-2" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select name="speciality" onChange={handleFilterChange} value={filters.speciality} className="border rounded-md p-1 cursor-pointer">
            <option value="">Speciality</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Oncologist">Oncologist</option>
          </select>
          <select name="location" onChange={handleFilterChange} value={filters.location} className="border rounded-md p-1 cursor-pointer">
            <option value="">Location</option>
            <option value="New York,USA">New York,USA</option>
            <option value="Los Angeles,USA">Los Angeles,USA</option>
            <option value="Chicago,USA">Chicago,USA</option>
            <option value="Houston,USA">Houston,USA</option>
            <option value="Phoenix,USA">Phoenix,USA</option>
            <option value="San Antonio,USA">San Antonio,USA</option>
          </select>
          <select name="experience" onChange={handleFilterChange} value={filters.experience} className="border rounded-md p-1 cursor-pointer">
            <option value="">Experience</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
            <option value="15">15+ years</option>
            <option value="20">20+ years</option>
          </select>
          <select name="status" onChange={handleFilterChange} value={filters.status} className="border rounded-md p-1 cursor-pointer">
            <option value="">Status</option>
            <option value="Unique">Unique</option>
            <option value="Duplicate">Duplicate</option>
            <option value="Preloaded">Preloaded</option>
          </select>

          </div>
          <div>
            <button onClick={resetFilters} className="px-4 py-2 bg-red-500 text-white rounded">Reset</button>
          </div>
        </div>

        {/* Doctors Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100">
              <th className="text-left p-2">Doctor</th>
              <th className="text-left p-2">Speciality</th>
              <th className="text-left p-2">Location</th>
              <th className="text-left p-2">Experience</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-2">{doctor.doctor_Name}</td>
                <td className="p-2">{doctor.speciality}</td>
                <td className="p-2 text-[#800080]">{doctor.location}</td>
                <td className="p-2">{doctor.experience}</td>
                <td className="p-2">{doctor.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Create Cohort Button */}
        <div className="flex justify-end mt-6">
        <Link to="/cohortSelection"><button className="bg-[#800080] text-white px-4 py-2 rounded-md">Define Cohort</button></Link>
        </div>
      </main>
    </div>
  );
}
