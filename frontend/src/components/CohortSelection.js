import { useState } from "react";
import {Link} from 'react-router-dom'
import { Search, ChevronDown } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";
import Sidebar from "./Sidebar"
import ProgressBar from "./ProgressBar";
import Header from './Header'

const cohorts = [
  { title: "Experienced Cardiologists", total: 50, reason: "Highly skilled professionals with established credibility and patient trust" },
  { title: "Active Publisher Cardiologists", total: 15, reason: "Thought leaders shaping medical advancements through published research" },
  { title: "Social Media Active Cardiologists", total: 70, reason: "Engaging audiences with educational content and healthcare discussions" },
  { title: "Cardiologists in Research", total: 40, reason: "Contributing to cutting-edge treatments and breakthrough therapies" },
  { title: "Cardiologists in New York, NY", total: 25, reason: "Key figures in a top-tier medical hub influencing regional healthcare trends" },
  { title: "Female Cardiologists", total: 60, reason: "Addressing gender-specific healthcare needs and patient preferences" },
  { title: "Early-Career Cardiologists", total:35, reason:"Rising professionals eager to adopt innovative techniques and technology"},
  { title: "Cardiologists with High Patient Volume", total:45, reason:"Strong impact on patient outcomes due to large caseload and clinical exposure"}
];

export default function CohortSelection() {
  const [search, setSearch] = useState("");
  const [selectCohort,setSelectCohort] = useState(null)
  const [cohortData,setCohortData] = useState('')

  const handleSelect = (index) => {
    setSelectCohort(index);
  };

  const handleCohort = (cohort) =>{
    console.log("cohort Data :",cohort)
    setCohortData(cohort)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Welcome, Marc</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search here" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-8 py-2 text-sm w-64"
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
        </header> */}
        <Header />

        <ProgressBar />

        {/* Cohort Section */}
        <h2 className="text-xl font-semibold text-[#800080] mt-16">Define Cohort</h2>
        <p className="text-gray-500 mb-6">AI has identified 6 cohorts based on the data and context provided!</p>

        <div className="grid grid-cols-2 gap-6">
          {cohorts
            .filter(cohort => cohort.title.toLowerCase().includes(search.toLowerCase()))
            .map((cohort, index) => (
              <div 
              key={index} 
              onClick={()=>{handleSelect(index); handleCohort(cohort)}}
              
              className={`border p-4 rounded-lg shadow-sm cursor-pointer ${
                selectCohort === index ? "border-[#800080] ring-2 ring-[#800080]" : ""
              }`}
              >
                <h3 className="font-semibold">{cohort.title}</h3>
                <p className="text-sm text-gray-600"><span className="font-medium">Total HCPs : </span>{cohort.total}</p>
                <p className="text-sm text-gray-500"><span className="font-medium">Reason For Suggestion:</span> {cohort.reason}</p>
              </div>
          ))}
        </div>

        {/* Generate Button */}
        <div className="flex justify-end mt-6">
        <Link to="/generateContent" state={{cohortData}}><button className="bg-[#800080] text-white px-4 py-2 rounded-md">Generate Content</button></Link>
        </div>
      </main>
    </div>
  );
}
