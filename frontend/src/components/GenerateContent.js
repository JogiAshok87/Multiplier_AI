import { useState , useContext} from "react";
import Sidebar from "./Sidebar"
import ProgressBar from "./ProgressBar";
import { Link ,useLocation} from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { UploadCloud} from "lucide-react";
import axios from 'axios'

import { storeContext } from "../ContextAPI";


const socialPlatforms = ["Facebook", "Instagram", "LinkedIn"];

export default function GenerateContent() {

  const {promptResponse, setPromtResponse} = useContext(storeContext)
 
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [content, setContent] = useState("");
  const [isSocialChecked,setIsSocialChecked] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState({});
  // const [selectedCohort,setSelectedCohort] = useState("");
  const [prompt, setPrompt] = useState("");
  // const [response, setResponse] = useState("");
  
  const channels = ["Email", "In-app message", "Push notification", "SMS"];

  const [selectedFile, setSelectedFile] = useState([]);

  const location = useLocation();
  const cohortData = location.state?.cohortData || null;

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFile((prevFiles)=>[...prevFiles,...files])
  };

  

  const handleSocialCheckboxChange= () =>{
    setIsSocialChecked(!isSocialChecked)
  }

  const handlePlatformCheckboxChange = (platform) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };
  const handleChannelSelection = (channel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };
  

  const selectAllChannels = () => {
    setSelectedChannels(channels.length === selectedChannels.length ? [] : [...channels]);
  };

  const handleSubmit = async () =>{
    const formData = new FormData();

    // console.log('campaignName:', campaignName);
    formData.append("campaignName",campaignName);


    // console.log('content:', content);
    formData.append("content",content);

    // console.log('selectedCohort:', selectedCohort);
    // formData.append("selectedCohort",selectedCohort);

    // console.log('selectedChannels:', selectedChannels);
    formData.append("selectedChannels", JSON.stringify(selectedChannels));


    // console.log('selectedPlatforms:', selectedPlatforms);
    formData.append("selectedPlatforms",JSON.stringify(selectedPlatforms));

    if (selectedFile.length>0){
      selectedFile.forEach((eachFile)=>{
        formData.append("file",eachFile)
      })
      // formData.append("file",selectedFile);
    }
    console.log('FormData entries:', Array.from(formData.entries())); 
    try{
      const response = await axios.post('http://127.0.0.1:5000/generateContent',formData)

      if (response.status===201){
        const result= await response.data
        console.log('API Response from Generate content',result)

        setCampaignName("");
        setContent("");
        // setSelectedCohort("");
        setSelectedChannels([]);
        setSelectedPlatforms({});
        setSelectedFile([]);
        setIsSocialChecked(false);
      }

      

    }catch(error){
      console.log('Error :',error)
    }

  }

  const handleSend = async () => {
    console.log('Prompt :',prompt,cohortData)
    if (!prompt.trim()) return;
    
    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { prompt, cohortData });
      if (res.data && res.data.response) {
        setPromtResponse(res.data.response); // Setting the response to state
        console.log("Processed Response:", res.data.response); // Logging the response
    } else {
        console.error("Unexpected response format:", res.data);
        setPromtResponse("Unexpected response format received.");
    }
      
    } catch (error) {
      console.error("Error fetching response:", error);
      setPromtResponse("Error getting response from server.");
    }
  };

 










  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, Marc</h1>
          <div className="flex gap-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="border rounded px-4 py-2 text-sm w-64"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
              <button className="bg-[#FA7F18] text-white border-none rounded-full p-2">MJ</button>
              <div className="flex flex-col">
                <p>Marc Jacob</p>
                <p>marco@gmail.com</p>
              </div>
              <FaAngleDown />
            </div>
            </div>
        </header>

        <ProgressBar />

        {/* Generate Content Section */}
        <h2 className="text-2xl font-semibold text-[#800080] mt-16">Generate Content</h2>
        <p className="text-gray-500 mb-6">Create content for a specific audience and channel</p>

        {/* Channels */}
        <div className="mb-4">
          <label className="block font-semibold">Channels</label>
          <div className="flex flex-col mt-2 space-y-2">
           <div className="flex items-center gap-5">
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={selectedChannels.includes("Email")} 
              onChange={() => handleChannelSelection("Email")} 
            />
            <p>Email</p>
          </div>
            <div className="flex items-center gap-5">
              <input type="checkbox" className="cursor-pointer" checked={isSocialChecked} onChange={handleSocialCheckboxChange}/>
              <p>Social media</p>
            </div>
            {/* Nested Dropdown for Social Media Platforms */}
            {isSocialChecked && (
              <div className="ml-5 mb-52 bg-gray-100 p-3 rounded-lg shadow-inner w-32">
                {socialPlatforms.map((platform) => (
                  <label key={platform} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms[platform] || false}
                      onChange={() => handlePlatformCheckboxChange(platform)}
                    />
                    {platform}
                  </label>
                ))}
              </div>)}


          </div>

            
        
          <button
            className="mt-5 bg-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-400"
            onClick={selectAllChannels}
          >
            Select all
          </button>
        </div>

        {/* Content Customization */}
        <div className="mb-4">
          <label className="block font-semibold">Content name</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1 border-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Content to generate</label>
          <textarea
            value={content}
            
            onChange={(e) => {setContent(e.target.value); setPrompt(e.target.value)}}
            className="w-full border px-3 py-2 rounded mt-1 h-24 border-gray-400"
          ></textarea>
        </div>

        {/* Upload File */}
        
        <label htmlFor="file-upload" className="border-dashed border-2 border-gray-400 p-6 rounded-md mt-4 mb-4 flex flex-col items-center cursor-pointer">
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
              multiple  // Allow multiple files
              onChange={handleFileChange}
            />
        </label>
        

        {/* Choose Template Button */}
        <div className="flex justify-between">
        <button onClick={handleSubmit} className="bg-gray-200 text-black hover:bg-slate-500 px-4 py-2 rounded-md">Submit</button>
        <Link to="/selectTemplate"><button onClick={handleSend} className="bg-[#800080] text-white px-4 py-2 rounded-md">Choose Template</button></Link>
        </div>
      </main>
    </div>
  );
}
