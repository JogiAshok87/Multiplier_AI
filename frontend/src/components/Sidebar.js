import { useState } from "react";
import {Link} from 'react-router-dom'

export default function Header() {
  const [isCampaignOpen, setIsCampaignOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="pl-5 flex items-center justify-between">
        <h2 className="text-white font-normal text-lg mr-1">
          MULTIPLIER <span className="bg-white text-[#7116AC] px-3 py-1 rounded-full">AI</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-grow">
        <ul>
          {/* Dashboard */}
          <li className="mb-2">
            <Link to="/dashboard" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800"> Dashboard</Link>
          </li>

          {/* Campaigns */}
          <li className="mb-2">
            <button
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800"
              onClick={() => setIsCampaignOpen(!isCampaignOpen)}
            >
              <span> Campaigns</span>
            </button>
            {isCampaignOpen && (
              <ul className="pl-6 mt-2">
                <li><Link to="/campaignPage" className="block py-1 hover:text-purple-400">Create Campaign</Link></li>
                <li><a href="#" className="block py-1 hover:text-purple-400">Manage Campaigns</a></li>
              </ul>
            )}
          </li>

          {/* Templates */}
          <li className="mb-2">
            <button
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800"
              onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
            >
              <span> Templates</span>
            </button>
            {isTemplatesOpen && (
              <ul className="pl-6 mt-2">
                <li><a href="#" className="block py-1 hover:text-purple-400">Email Templates</a></li>
                <li><a href="#" className="block py-1 hover:text-purple-400">SMS Templates</a></li>
              </ul>
            )}
          </li>

          {/* Reports */}
          <li className="mb-2">
            <button
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800"
              onClick={() => setIsReportsOpen(!isReportsOpen)}
            >
              <span> Reports</span>
            </button>
            {isReportsOpen && (
              <ul className="pl-6 mt-2">
                <li><a href="#" className="block py-1 hover:text-purple-400">Performance</a></li>
                <li><a href="#" className="block py-1 hover:text-purple-400">Delivery Reports</a></li>
              </ul>
            )}
          </li>

          {/* Customers */}
          <li>
            <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800"> Customers</a>
          </li>
        </ul>
      </nav>

      {/* Plan Details */}
      <div className="p-4 bg-gray-800 rounded-lg mb-4">
        <h3 className="text-md font-semibold">Your plan</h3>
        <div className="text-xs text-gray-400">
        <p className="mt-1 flex justify-between">
            Content sent: <span>50/100</span>
          </p>
          <p className="mt-1 flex justify-between">
            Emails sent: <span>50/100</span>
          </p>
          <p className="mt-1 flex justify-between">
            Post sent: <span>10/50</span>
          </p>
          <p className="mt-1 flex justify-between">
            Content genrated: <span>10/50</span>
          </p>
          <p className="mt-1 flex justify-between">
            Daily requests: <span>60/100</span>
          </p>
        </div>
        <a href="#" className="text-[#800080] text-md block mt-2">Make an upgrade</a>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800">⚙️ Settings</a>
        <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800">💬 Support</a>
      </div>
    </aside>
  );
}
