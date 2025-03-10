import { useState} from "react";
import {Link} from 'react-router-dom'
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaAngleDown,FaAngleUp } from "react-icons/fa6";
// import { FaAngleDown } from "react-icons/fa6";
import { UploadCloud} from "lucide-react";
import axios from 'axios'
import Sidebar from "./Sidebar";
import ProgressBar from "./ProgressBar";
import Header from "./Header";


export default function CampaignPage() {
  
  const [selectedFile, setSelectedFile] = useState([]);
  const [campaignData, setCampaignData] = useState({
    campaignName: "",
    campaignContent: "",
    campaignFile: null,
  });



  const changeHandler = (e) =>{
    setCampaignData({...campaignData, [e.target.name]:e.target.value})
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFile(files)
    setCampaignData(prev => ({...prev, campaignFile: files}))
  };

  const formSubmitHandler = async (e) =>{
      e.preventDefault()
      const formData = new FormData();
      formData.append("campaignName",campaignData.campaignName)
      formData.append("campaignContent",campaignData.campaignContent)

      if (campaignData.campaignFile && campaignData.campaignFile.length>0){
        campaignData.campaignFile.forEach((file)=>{
          formData.append("campaignFiles",file);
        });
      }

      console.log("Submitting FormData :",formData)

      try{
        const response = await axios.post("http://localhost:5000/campaign",formData)
        

        if (response.status===201){
          const result = await response.data
          console.log('Response:',result)
          alert("Campaign saved successfully")

          setCampaignData({
            campaignName:"",
            campaignContent:"",
            campaignFile:[],
          })

          // setFile(null)
          setSelectedFile([])
          // setProgress(0)

        }

      }catch(error){
        console.error("campaign data error:",error.response?.data || error.message);
      alert(error.response?.data?.message || "something went wrong in the campaign data")

      }
  }

  
 

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        {/* <header className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">Welcome, Marc</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search here"
              className="border rounded px-3 py-2 text-sm"
            />
            <div className="flex flex-row items-center gap-3">
              <button className="bg-[#FA7F18] text-white border-none rounded-full p-2">
                MJ
              </button>
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

        

        {/* Steps Section */}
        <form className="space-y-6 flex-grow mt-10"  onSubmit={formSubmitHandler}>
          <div className="border py-8 px-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-[#800080]">
              Step 1 of 3: Define the campaign
            </h2>
            <input
              type="text"
              name="campaignName"
              placeholder="Enter purpose of the campaign"
              className="mt-2 border px-3 py-2 w-full rounded"
              value = {campaignData.campaignName || ""}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="border py-8 px-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-[#800080]">
              Step 2 of 3: Define content source
            </h2>
            <input
              type="text"
              name="campaignContent"
              placeholder="Enter content source"
              className="mt-2 border px-3 py-2 w-full rounded"
              value = {campaignData.campaignContent || ""}
              onChange={changeHandler}
              required
            />
          </div>

         <div className="border p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-[#800080]">
              Step 3 of 3: Upload data source
            </h2>
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
          <div>
            <button type="submit" className="px-4 py-2 bg-slate-50 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white">Save</button>
          </div>
        </form>

        {/* Pagination and Action Button at Bottom */}
        <div className="mt-6 flex justify-end">
          <Link to="/HCPDashboard"><button className="mt-6 bg-[#800080] text-white px-4 py-2 rounded-md w-50px">Select HCP</button></Link>
        </div>

        
      </main>
    </div>
  );
}


