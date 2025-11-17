import React, { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Images } from "lucide-react";
import { TexturesPage } from "./TexturesPage";

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("textures");

  const tabs = [
    { id: "textures", label: "Textures", icon: Images },
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
        </header>

        <nav className="flex gap-4 border-b border-gray-800 pb-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>

        <section className="pt-6">
          {activeTab === "textures" && <TexturesPage />}
          {activeTab === "dashboard" && (
            <div className="text-gray-400 text-center py-10 text-xl">Dashboard coming soon...</div>
          )}
        </section>
      </motion.div>
    </div>
  );
};
