import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Search, Bookmark, Briefcase, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onSearch, searchTerm }) => {
    const location = useLocation();
    const isFrontPage = location.pathname === "/";
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                        Inside<span className="text-blue-600">Jobs</span>
                    </h1>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {isFrontPage && (
                        <div className="w-80 relative group">
                            <input
                                type="text"
                                placeholder="Search by role or company..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-700 transition-all outline-none text-slate-900 dark:text-slate-100 dark:placeholder-slate-400"
                                value={searchTerm}
                                onChange={(e) => {
                                    const value = e.target.value.substring(0, 100);
                                    onSearch(value);
                                }}
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                    )}

                    <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-700"></div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95 border border-transparent hover:border-blue-500"
                            aria-label="Toggle Theme"
                        >
                            {theme === "light" ? <Moon className="w-5 h-5 text-slate-900" /> : <Sun className="w-5 h-5 text-white" />}
                        </button>

                        <NavLink
                            to="/saved"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm ${isActive
                                    ? "bg-blue-600 text-white shadow-blue-100"
                                    : "bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white hover:bg-slate-800 dark:hover:bg-slate-200"
                                }`
                            }
                        >
                            <Bookmark className="w-4 h-4" fill={location.pathname === "/saved" ? "currentColor" : "none"} />
                            Saved Jobs
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
