import React from 'react';
import { Bookmark, MapPin, Building2, ExternalLink } from 'lucide-react';

const JobCard = ({ job, onSave, isSavedPage, onRemove }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight" title={job.title}>
            {job.title}
          </h3>
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold mt-2">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{job.company_name}</span>
          </div>
        </div>
        <div className="ml-4">
          {isSavedPage ? (
            <button
              onClick={onRemove}
              className="p-2.5 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
              title="Remove from bookmarks"
            >
              <Bookmark className="w-5 h-5 fill-red-500" />
            </button>
          ) : (
            <button
              onClick={() => onSave(job)}
              className="p-2.5 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Save to bookmarks"
            >
              <Bookmark className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-3 py-1.5 rounded-lg">
          <MapPin className="w-3.5 h-3.5" />
          {job.location}
        </div>
        {job.remote && (
          <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-900/30">
            Remote
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => window.open(job.url, '_blank')}
          className="flex-1 px-4 py-3 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </button>
        <button
          onClick={() => window.open(job.url, '_blank')}
          className="px-4 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;