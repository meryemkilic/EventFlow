import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, BarChart2, Settings, 
  Search, Bell, ChevronRight, LogOut, Eye
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Import Pages
import EventDetail from './EventDetail';
import QuestionBank from './QuestionBank';
import Analytics from './Analytics';
import SettingsPage from './SettingsPage';
import LiveCommandCenter from './LiveCommandCenter';

const SidebarItem = ({ icon: Icon, label, to, active }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-primary/10 text-primary" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-primary" : "group-hover:text-white")} />
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

const HostLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Sidebar - Dark Mode Persistent */}
      <div className="w-64 border-r border-gray-800 bg-[#05070B] flex flex-col sticky top-0 h-screen z-50">
        <div className="p-6 border-b border-gray-800">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">EF</div>
                <span className="font-display font-bold text-lg tracking-tight text-white">EventFlow</span>
             </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1">
            <SidebarItem 
                icon={LayoutDashboard} 
                label="Events" 
                to="/host/events/1" 
                active={location.pathname.includes('/host/events')} 
            />
            <SidebarItem 
                icon={MessageSquare} 
                label="Question Bank" 
                to="/host/questions" 
                active={location.pathname.includes('/host/questions')} 
            />
            <SidebarItem 
                icon={BarChart2} 
                label="Analytics" 
                to="/host/analytics" 
                active={location.pathname.includes('/host/analytics')} 
            />
            <SidebarItem 
                icon={Settings} 
                label="Settings" 
                to="/host/settings" 
                active={location.pathname.includes('/host/settings')} 
            />
        </div>

        <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">Admin User</p>
                    <p className="text-xs text-gray-500 truncate">Pro Plan</p>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Area - Light Mode */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Top Header Shared */}
        <header className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
             <div className="flex items-center gap-2 text-sm">
                <Link to="/host/events/1" className="text-muted-foreground hover:text-primary transition-colors">Events</Link>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Advanced Java Architecture 2025</span>
             </div>

             <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="h-9 pl-9 pr-4 rounded-full bg-slate-100 border-none text-sm focus:ring-2 focus:ring-primary/20 w-64"
                        onKeyDown={(e) => e.key === 'Enter' && toast.info("Global search is coming soon!")}
                    />
                </div>
                <button 
                    className="p-2 rounded-full hover:bg-slate-100 text-muted-foreground transition-colors flex items-center gap-2"
                    onClick={() => toast.success("Participant preview mode activated")}
                >
                    <Eye className="w-5 h-5" />
                </button>
                <button 
                    className="relative p-2 rounded-full hover:bg-slate-100 text-muted-foreground transition-colors"
                    onClick={() => toast.info("No new notifications")}
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
                </button>
             </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
            <Routes>
                <Route path="events/:id" element={<EventDetail />} />
                <Route path="questions" element={<QuestionBank />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="live" element={<LiveCommandCenter />} />
            </Routes>
        </main>
      </div>
    </div>
  );
};

export default HostLayout;
