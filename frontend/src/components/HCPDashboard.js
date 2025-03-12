import React,{ useState,useEffect } from "react";
import { UploadCloud, Search, ChevronDown } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";
import {Link,useNavigate} from 'react-router-dom'
import Sidebar from "./Sidebar"
import ProgressBar from "./ProgressBar";
import axios from "axios"
import Header from './Header'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";




const location = [
  "California", "Ohio", "New Jersey", "Kansas", "Illinois", "Michigan", "Pennsylvania", 
  "Indiana", "Louisiana", "Texas", "Indiana", "Maryland", "New Jersey", "Tennessee", 
  "North Carolina", "Florida", "Colorado", "Washington", "Vermont", "Kentucky", 
  "Minnesota", "Louisiana", "Mississippi", "Illinois", "Massachusetts", "Nebraska", 
  "New York", "Maine", "South Carolina", "Georgia", "Wisconsin", "Oregon", "Montana", 
  "Iowa", "New Mexico", "District of Columbia", "Missouri", "West Virginia", "Oklahoma", 
  "Arizona", "Arkansas", "Virginia", "Nevada", "New Hampshire", "Connecticut", "Utah", 
  "Rhode Island", "Puerto Rico", "Alabama", "Delaware"
];

const Sub_Speciality = [
  "Epilepsy", "Anxiety Disorders", "Psoriasis", "Arrhythmia", "Heart Failure", 
  "Cancer Prevention", "COPD", "Skin Cancer", "Thyroid Disorders", 
  "Joint Replacement", "Sports Medicine", "Breast Cancer", "Asthma", 
  "Diabetes Management", "Stroke Management", "Depression Treatment"
];


export default function HCPDashboard() {

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState([]);
  const [doctorsData,setDoctorsData] =useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    speciality: "",
    sub_speciality:"",
    location: "",
    experience: "",
    Status: "",
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFile(files)
  };

  useEffect( ()=>{

    const fetchData = async() =>{
      try{
        const resposne = await axios.get("http://127.0.0.1:5000/HCPData")
  
        if (resposne.status === 200){
          console.log("resposne from backend",resposne.data)
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
      sub_speciality:"",
      location: "",
      experience: "",
      status: "",
    });
    setSearchTerm("");
  };

  const filteredDoctors = doctorsData.filter((doctor) => {
    const experienceNumber = parseInt(doctor.Experience,10) || 0
    const statusLowerCase = doctor.Status ? doctor.Status.toLowerCase() : ""; // Handle undefined/null
    const filterStatusLowerCase = filters.Status ? filters.Status.toLowerCase() : "";
    const stateLowerCase = doctor.State_Name ? doctor.State_Name.toLowerCase() : ""; // Handle case insensitivity
    const filterStateLowerCase = filters.location ? filters.location.toLowerCase() : "";
    const subSpecialityLowerCase = doctor.sub_speciality ? doctor.sub_speciality.toLowerCase() : ""; // Handle case insensitivity
    const filterSubSpecialityLowerCase = filters.sub_speciality ? filters.sub_speciality.toLowerCase() : "";

    return (
      doctor.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.speciality ? doctor.speciality === filters.speciality : true) &&
      (filters.sub_speciality ? subSpecialityLowerCase === filterSubSpecialityLowerCase : true) &&
      (filters.location ? stateLowerCase === filterStateLowerCase : true) &&
      (filters.experience ? experienceNumber >= parseInt(filters.experience, 10) : true) &&
      (filters.Status ? statusLowerCase === filterStatusLowerCase : true) 
    );
      
    
  });

  const handleRowClick = (doctor) => {
    navigate(`/doctorsProfilePage`, { state: { doctor } });
  };


  const handleExportToExcel = () => {
    if (filteredDoctors.length === 0) {
      alert("No data to export!");
      return;
    }
  
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(filteredDoctors.map(doctor => ({
      Doctor: doctor.doctor_name,
      Speciality: doctor.speciality,
      "Sub-Speciality": doctor.sub_speciality,
      Location: `${doctor.city}, ${doctor.State_Name}`,
      Experience: doctor.Experience,
      Status: doctor.Status,
    })));
  
    // Create a workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Doctors");
  
    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, "Doctors_List.xlsx");
  };
  





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

          {/*<select name="Paltform" onChange={handleFilterChange} value={filters.platform} className="border rounded-md p-1 cursor-pointer">
            <option value="Paltform">Paltform</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter">Twitter</option>
            <option value="Facebook">Facebook</option>
            <option value="Youtube">Youtube</option>
            <option value="LinkedIN">LinkedIN</option>
            
          </select>*/}

          <select name="speciality" onChange={handleFilterChange} value={filters.speciality} className="border rounded-md p-1 cursor-pointer">
            <option value="">Speciality</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Psychiatrist">Psychiatrist</option>

          </select>
          <select name="sub_speciality" onChange={handleFilterChange} value={filters.sub_speciality} className="border rounded-md p-1 cursor-pointer">
            <option value="">Sub-Speciality</option>
            {Sub_Speciality.map((speciality,index)=>(
              <option key={index} value={speciality}>{speciality}</option>
            ))}
          </select>
          {/* <select name="location" onChange={handleFilterChange} value={filters.location} className="border rounded-md p-1 cursor-pointer">
            <option value="">Location</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select> */}
          <select 
            name="location" 
            onChange={handleFilterChange} 
            value={filters.location} 
            className="border rounded-md p-1 cursor-pointer"
          >
            <option value="">Location</option>
            {location.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select name="experience" onChange={handleFilterChange} value={filters.experience} className="border rounded-md p-1 cursor-pointer">
            <option value="">Experience</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
            <option value="15">15+ years</option>
            <option value="20">20+ years</option>
          </select>
          <select name="Status" onChange={handleFilterChange} value={filters.Status} className="border rounded-md p-1 cursor-pointer">
            <option value="">Status</option>
            <option value="Unique">Unique</option>
            <option value="Duplicate">Duplicate</option>
            <option value="Predefined">Predefined</option>
          </select>

          </div>
          <div>
            <button onClick={resetFilters} className="px-4 py-2 bg-red-500 text-white rounded">Reset</button>
          </div>
        </div>

        <div className="overflow-y-scroll overflow-x-hidden max-h-[400px]">
        {/* Doctors Table */}
         <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100">
              <th className="text-left p-2">Doctor</th>
              <th className="text-left p-2">Speciality</th>
              <th className="text-left p-2">Sub-Speciality</th>
              <th className="text-left p-2">Location</th>
             
              <th className="text-left p-2">Experience</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody >
            {filteredDoctors.map((doctor, index) => (
              <tr 
              key={index} 
              onClick={()=>handleRowClick(doctor)}
              className="border-b border-gray-200 cursor-pointer">
                <td className="p-2">{doctor.doctor_name}</td>
                <td className="p-2">{doctor.speciality}</td>
                <td className="p-2">{doctor.sub_speciality}</td>
                <td className="p-2 text-[#800080]">{doctor.city}, {doctor.State_Name}</td>
                
                <td className="p-2">{doctor.Experience}</td>
                <td className="p-2">{doctor.Status}</td>
              </tr>
            ))}
          </tbody>
         </table>
        </div>

        {/* Create Cohort Button */}
        <div className="flex justify-between mt-6">
          <button className="bg-gray-500 px-4 py-2 rounded-lg cursor-pointer text-white" onClick={handleExportToExcel} >Export</button>
        <Link to="/cohortSelection"><button className="bg-[#800080] text-white px-4 py-2 rounded-md">Define Cohort</button></Link>
        </div>
      </main>
    </div>
  );
}
