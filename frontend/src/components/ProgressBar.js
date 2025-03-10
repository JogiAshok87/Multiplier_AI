import { useLocation,useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

const ProgressBar = () => {
  const location = useLocation(); 
  const navigate = useNavigate()

  // Define the steps/pages in order
  const steps = [
    "/campaignPage",
    "/HCPDashboard",
    "/cohortSelection",
    "/generateContent",
    "/selectTemplate",
    "/contentReview",
    "/dashboard"
  ];

  const stepNames = {
    "/campaignPage": "Define Campaign",
    "/HCPDashboard": "HCP List",
    "/cohortSelection": "Define Cohort",
    "/generateContent": "Content Generation",
    "/selectTemplate": "Templates",
    "/contentReview": "Content Review",
    "/dashboard": "Dashboard"

  }

  // Hide progress bar on the login page
  if (location.pathname === "/login") return null;

  // Track the current step based on the URL
  const currentStep = steps.indexOf(location.pathname) + 1; 
  const totalSteps = steps.length;

  const progress = (currentStep/totalSteps)*100

  const adjustedProgress = progress < 100 ? progress - 4 : progress;

 
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 mt-8 relative">
      <div
        className="h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${adjustedProgress}%`,
          backgroundColor: progress === 100 ? "green" : "#800080",
          borderRadius: "5px",
        }}
      />
      {/* Progress Steps */}
      <ul className="flex justify-between text-sm mt-2 px-8 ">
        {steps.map((step, index) => (
          <span key={step} 
          onClick={()=>navigate(step)}
          className={`cursor-pointer transition-all duration-200 hover:text-lg ${
            index + 1 === currentStep ? "font-bold text-black" : "text-gray-600"
          }`}>
            {stepNames[step]} {/* Display Name Instead of Path */}
          </span>
        ))}
      </ul>
    </div>
  );
};

export default ProgressBar;
