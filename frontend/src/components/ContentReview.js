import { useState,useContext,useEffect } from "react";
import Sidebar from "./Sidebar"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CSS/customQuill.css'
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { storeContext } from "../ContextAPI";
import { FaAngleDown } from "react-icons/fa6";
import Header from './Header'

export default function ContentReview() {
  
  const {promptResponse, setPromtResponse} = useContext(storeContext)
  const [value, setValue] = useState("");

  const emailTemplate = (subject, bodyContent) => `
  <p><strong>Subject Line:</strong> ${subject}</p>
  
  <p>Dear Dr. [Recipient’s Last Name],</p>

  <p>${bodyContent}</p>

  <p><strong>Best regards,</strong></p>
  <p>[Your Name]</p>
  <p>[Your Position]</p>
  <p>[Your Contact Information]</p>
`;
useEffect(() => {
  if (promptResponse) {
    const { subject, body } = extractEmailParts(promptResponse);
    setValue(emailTemplate(subject, body)); // **Update state dynamically**
  }
}, [promptResponse]);

// Extract Subject & Body from the promptResponse
const extractEmailParts = (response) => {
  const subjectMatch = response.match(/^Subject:\s*(.*)/); // Extract subject
  const subject = subjectMatch ? subjectMatch[1] : "Default Subject";

  // const removeGreeting = (emailBody) => {
  //   return emailBody.replace(/^Dear .*?,\s*/, ""); // Removes "Dear [Any Name],"
  // };
  
  // Assuming `emailBody` contains the text inside your editor
  // const updatedBody = removeGreeting(emailBody);

  let bodyContent = response.replace(/^Subject:.*?\n\n/, ""); // Remove Subject Line
  bodyContent = bodyContent.replace(/\n\nWarm regards,\n\n\[Your Name\]\n\[Your Title\]/, ""); // Remove Signature


    // Remove "Dear [Recipient's Last Name],"
    bodyContent = bodyContent.replace(/^Dear .*?,\s*/, "");

  return { subject: subject.trim(), body: bodyContent.trim() };
};

// Process the promptResponse
const { subject, body } = extractEmailParts(promptResponse);
const formattedEmail = emailTemplate(subject, body);

  
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }], // Heading options
      ['bold', 'italic', 'underline', 'strike'], // Basic text formatting
      [{ 'font': [] }], // Font selection (system-ui shown in the image)
      [{ 'color': [] }, { 'background': [] }], // Font color & background color
      [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/Superscript
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      [{ 'align': [] }], // Text alignment
      ['blockquote', 'code-block'], // Blockquote & Code block
      ['link', 'image', 'video'], // Media options
      [{ 'direction': 'rtl' }], // Text direction (optional)
      ['clean'], // Remove formatting
    ],
  };
  



  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* <header className="flex justify-between items-center mb-6">
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
        </header> */}
        <Header />
        <ProgressBar />

        {/* Content Review */}
        <h2 className="text-xl font-semibold text-[#800080] mt-16">Content Review</h2>
        
        <p className="text-sm text-gray-500 font-medium mb-4">Edit the response so that it best suits your campaign</p>

        <div className="border p-4 rounded-lg shadow-md bg-white">
          
               <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />

        </div>



        <div className="flex justify-end">
          <Link to="/dashboard"><button className="mt-4 px-6 py-2 bg-[#800080] text-white rounded-lg hover:bg-[#800080] transition">Generate Content</button> </Link>
        </div>
        
      </main>
    </div>
  );
}
