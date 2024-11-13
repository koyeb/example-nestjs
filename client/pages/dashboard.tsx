import withAuth from "../hoc/withAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NPCPage from "./npc";
import WorldPage from "./world";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Home");

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeTab");
    router.push("/auth");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <p>Welcome to the Home tab!</p>;
      case "Worlds":
        return <WorldPage />;
      case "Characters":
        return <p>Characters</p>;
      case "NPCs":
        return <NPCPage />;
      default:
        return <p>Welcome to the Home tab!</p>;
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Dashboard
      </h1>

      {/* Tab buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["Home", "Worlds", "Characters", "NPCs"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 border border-gray-300 rounded-lg">
        {renderContent()}
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg transition duration-300 hover:bg-red-600 focus:ring-2 focus:ring-red-300"
      >
        Logout
      </button>
    </div>
  );
};

export default withAuth(Dashboard);
