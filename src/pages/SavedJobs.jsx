import React, { useState, useEffect } from "react";
import JobCard from "../ui/jobCard";
import Toast from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { BookmarkX, ArrowLeft, Bookmark } from "lucide-react";

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [toast, setToast] = useState({ show: false, message: "" });
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
            setSavedJobs(Array.isArray(saved) ? saved : []);
        } catch (e) {
            console.error("Error reading from storage:", e);
            setToast({ show: true, message: "Error loading saved jobs." });
            setSavedJobs([]);
        }
    }, []);

    const handleRemoveJob = (slug) => {
        try {
            const updated = savedJobs.filter((job) => job.slug !== slug);
            localStorage.setItem("savedJobs", JSON.stringify(updated));
            setSavedJobs(updated);
            setToast({ show: true, message: "Job removed from bookmarks!" });
        } catch (e) {
            console.error("Error updating storage:", e);
            setToast({ show: true, message: "Error updating bookmarks." });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Saved Opportunities</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium ml-7">Manage your {savedJobs.length} bookmarked roles</p>
                    </div>
                    {savedJobs.length > 0 && (
                        <button
                            onClick={() => navigate("/")}
                            className="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Browse More Jobs
                        </button>
                    )}
                </header>

                {savedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs.map((job) => (
                            <JobCard
                                key={job.slug}
                                job={job}
                                isSavedPage={true}
                                onRemove={() => handleRemoveJob(job.slug)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 p-20 text-center rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 rounded-2xl flex items-center justify-center mb-8">
                            <BookmarkX className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">No bookmarks yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
                            Jobs you save will appear here. Start exploring our latest listings and build your dream career!
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-4 bg-blue-600 dark:bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-all shadow-lg shadow-blue-100 dark:shadow-none active:scale-95"
                        >
                            Browse Latest Jobs
                        </button>
                    </div>
                )}
            </div>

            {toast.show && (
                <Toast
                    message={toast.message}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default SavedJobs;
