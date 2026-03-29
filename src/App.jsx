import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Jobs from "./pages/jobs";
import SavedJobs from "./pages/SavedJobs";
import Navbar from "./ui/navbar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Navbar onSearch={setSearchTerm} searchTerm={searchTerm} />
          <Routes>
            <Route path="/" element={<Jobs searchTerm={searchTerm} />} />
            <Route path="/saved" element={<SavedJobs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;