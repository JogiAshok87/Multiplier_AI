import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import CampaignPage from "./components/CampaignPage";
import Dashboard from "./components/Dashboard";
import HCPDashboard from "./components/HCPDashboard";
import CohortSelection from "./components/CohortSelection";
import GenerateContent from "./components/GenerateContent";
import SelectTemplate from "./components/SelectTemplate";
import ContentReview from "./components/ContentReview";
import Login from "./components/Login";
import DoctorsProfilePage from "./components/DoctorsProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/*"
          element={
            <>
             
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/campaignPage" element={<CampaignPage />} />
                <Route path="/HCPDashboard" element={<HCPDashboard />} />
                <Route path="/cohortSelection" element={<CohortSelection />} />
                <Route path="/generateContent" element={<GenerateContent />} />
                <Route path="/selectTemplate" element={<SelectTemplate />} />
                <Route path="/contentReview" element={<ContentReview />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/doctorsProfilePage" element={<DoctorsProfilePage />}/>
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;













// import HCPDashboard from "./components/HCPDashboard";
// import CampaignPage from "./components/CampaignPage"
// import CohortSelection from "./components/CohortSelection"
// import GenerateContent from "./components/GenerateContent"
// import SelectTemplate from "./components/SelectTemplate"
// import ContentReview from "./components/ContentReview"
// import Dashboard from "./components/Dashboard"
// import Login from "./components/Login"
// import ProtectedRoute from "./components/ProtectedRoute";
// import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'


// function App() {
//   return (
//     // <div>
//     //   <Login />
//     // </div>
//     <Router>
//       <Routes>
//       <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />}/>
//         <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />}/>}/>
//         <Route path="/campaignPage" element={<CampaignPage />}/>
//         <Route path="/cohortSelection" element={<CohortSelection />}/>
//         <Route path="/generateContent" element={<GenerateContent />}/>
//         <Route path="/selectTemplate" element={<SelectTemplate />}/>
//         <Route path="/contentReview" element={<ContentReview />}/>
//         <Route path="/HCPDashboard" element={<HCPDashboard />}/>

        
//       </Routes>
//     </Router>
//   );
// }

// export default App;
