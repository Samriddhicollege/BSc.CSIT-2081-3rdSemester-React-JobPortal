import JobCard from "../ui/jobCard";
import Toast from "../ui/toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { Filter, Loader2, SearchX, Briefcase, AlertCircle } from "lucide-react";

const Jobs = ({ searchTerm }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isRemoteOnly, setIsRemoteOnly] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "" });

    const fetchAllJobs = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get("https://www.arbeitnow.com/api/job-board-api");
            if (res.data && res.data.data) {
                setJobs(res.data.data);
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (e) {
            console.error("Error fetching jobs:", e);
            setError("Unable to load latest jobs. Please check your connection or try again.");
            setToast({ show: true, message: "Network error occurred." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    const handleSaveJob = (job) => {
        const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
        const isDuplicate = saved.find(item => item.slug === job.slug);
        if (isDuplicate) {
            setToast({ show: true, message: "Job already in bookmarks!" });
            return;
        }
        const updated = [...saved, job];
        localStorage.setItem("savedJobs", JSON.stringify(updated));
        setToast({ show: true, message: "Job saved to bookmarks!" });
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRemote = isRemoteOnly ? job.remote : true;
        return matchesSearch && matchesRemote;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-10 transition-colors">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Global Job Board</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-xl">
                            Search and apply to thousands of career-defining roles at top tech companies.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex items-center gap-2 px-3 py-2 text-slate-400 dark:text-slate-500 border-r border-slate-100 dark:border-slate-800">
                            <Filter className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
                        </div>
                        <button
                            onClick={() => setIsRemoteOnly(!isRemoteOnly)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 border ${isRemoteOnly
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 dark:shadow-none"
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700"
                                }`}
                        >
                            {isRemoteOnly ? "🏠 Remote Only" : "🌍 All Locations"}
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight">Scanning the globe for jobs...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-40 text-center max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-3xl flex items-center justify-center mb-8">
                            <AlertCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Something went wrong</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed text-lg">
                            {error}
                        </p>
                        <button
                            onClick={fetchAllJobs}
                            className="px-10 py-4 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-2xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center gap-3"
                        >
                            Try Again
                            <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard
                                    key={job.slug}
                                    job={job}
                                    onSave={() => handleSaveJob(job)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full bg-white dark:bg-slate-900 p-24 text-center rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                                    <SearchX className="w-10 h-10" />
                                </div>
                                <p className="text-slate-900 dark:text-white text-2xl font-extrabold mb-3">No jobs found</p>
                                <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">We couldn't find any results matching "{searchTerm}"</p>
                                <button
                                    onClick={() => setIsRemoteOnly(false)}
                                    className="px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
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

export default Jobs;
