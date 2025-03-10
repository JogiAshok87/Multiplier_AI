import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"
import { FaAngleDown } from "react-icons/fa6";
import ProgressBar from "./ProgressBar";

export default function SelectTemplate() {
  const [search, setSearch] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("All");
  const [selectedContentType, setSelectedContentType] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const channels = ["All", "Email", "Web", "Social Media", "Messaging"];
  const contentTypes = ["All", "Announcements", "Articles", "Posts", "Ads"];

  const templates = [
    { id: 1, img: "/image1.png", title: "Kidney Health" },
    { id: 2, img: "/image2.png", title: "Clinical Practice" },
    { id: 3, img: "/image3.png", title: "Dental Care" },
  ];

  const handleSelect = (id) => {
    setSelectedTemplate(id);
  };


  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Welcome, Marc</h1>
          <div className="relative flex gap-10">
            <input
              type="text"
              placeholder="Search here"
              className="border rounded px-4 py-2 text-sm w-64"
            />
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

        {/* Select a Template Section */}
        <h2 className="text-2xl font-semibold text-[#800080] mt-16">Select a template</h2>
        <input
          type="text"
          placeholder="Search templates"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full mt-2"
        />

        {/* Channels Filter */}
        <h3 className="mt-4 font-semibold">Channels</h3>
        <div className="flex space-x-2 mt-2">
          {channels.map((channel) => (
            <button
              key={channel}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedChannel === channel ? "bg-[#800080] text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedChannel(channel)}
            >
              {channel}
            </button>
          ))}
        </div>

        {/* Content Type Filter */}
        <h3 className="mt-4 font-semibold">Content type</h3>
        <div className="flex space-x-2 mt-2">
          {contentTypes.map((type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedContentType === type ? "bg-[#800080] text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedContentType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Template List */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {templates.map((template) => (
            <div 

            key={template.id}
            onClick={() => handleSelect(template.id)}

            className={`border p-4 rounded-lg shadow-sm cursor-pointer ${
              selectedTemplate === template.id ? "border-[#800080] ring-2 ring-[#800080]" : ""
            }`}
            >
              <img src={template.img} alt={template.title} className="rounded-lg" />
              <h3 className="mt-2 font-semibold text-center">{template.title}</h3>
            </div>
          ))}
        </div>

        <div className="flex justify-end m-10">
        <Link to="/contentReview"><button className="bg-[#800080] text-white rounded-md p-2">Content Review</button></Link>
        </div>
      </main>
    </div>
  );
}
