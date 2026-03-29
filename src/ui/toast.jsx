import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <Info size={20} />
    };

    const colors = {
        success: "bg-emerald-600/90 dark:bg-emerald-500/90 border-emerald-500",
        error: "bg-rose-600/90 dark:bg-rose-500/90 border-rose-500",
        info: "bg-blue-600/90 dark:bg-blue-500/90 border-blue-500"
    };

    return (
        <div className={`fixed bottom-8 right-8 z-[100] ${colors[type]} backdrop-blur-xl text-white px-6 py-4 rounded-2xl border shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5`}>
            <div className="flex items-center gap-3">
                <span className="p-1 bg-white/20 rounded-lg">{icons[type]}</span>
                <p className="font-bold tracking-tight">{message}</p>
            </div>
        </div>
    );
};

export default Toast;
