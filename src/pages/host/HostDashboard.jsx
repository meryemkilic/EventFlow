import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, MessageSquare, BarChart2, Settings, 
  Plus, Users, MoreVertical, Play, Clock, CheckCircle, AlertCircle,
  ChevronRight, Search, Bell
} from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { EFCard, EFCardContent, EFCardHeader, EFCardTitle } from "@/components/ui/ef-card";
import { EFBadge } from "@/components/ui/ef-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import LiveCommandCenter from './LiveCommandCenter';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, to, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-primary/10 text-primary' 
        : 'text-muted-foreground hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'group-hover:text-white'}`} />
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

const EventCard = ({ title, code, status, participants, date }) => (
  <EFCard className="group hover:border-primary/50 transition-all cursor-pointer hover:translate-y-[-2px]">
    <EFCardContent className="p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <EFBadge variant={status === 'LIVE' ? 'live' : status === 'DRAFT' ? 'warning' : 'default'}>
                    {status}
                </EFBadge>
                <span className="text-xs text-muted-foreground font-mono">{code}</span>
            </div>
            <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{title}</h3>
        </div>
        <button className="text-muted-foreground hover:text-white">
            <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{participants}</span>
        </div>
        <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{date}</span>
        </div>
      </div>

      <div className="pt-2 flex gap-2">
        {status === 'LIVE' ? (
             <Link to="/host/live" className="w-full">
                <EFButton className="w-full" size="sm">Resume Session</EFButton>
             </Link>
        ) : (
            <>
                <EFButton variant="secondary" size="sm" className="flex-1">Edit</EFButton>
                <EFButton variant="ghost" size="sm" className="px-2"><BarChart2 className="w-4 h-4" /></EFButton>
            </>
        )}
       
      </div>
    </EFCardContent>
  </EFCard>
);

// --- Pages ---

const DashboardHome = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Events</h1>
                <p className="text-muted-foreground">Manage your sessions and track engagement.</p>
            </div>
            <div className="flex gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-9 w-64 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50" placeholder="Search events..." />
                </div>
                <EFButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                </EFButton>
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
            {['All Events', 'Upcoming', 'Past', 'Drafts', 'Templates'].map((filter, i) => (
                <button key={filter} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${i === 0 ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-transparent text-muted-foreground hover:text-white hover:bg-white/5'}`}>
                    {filter}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <Link to="/host/live">
                <EventCard 
                    title="Advanced Java Architecture 2025" 
                    code="#JAVA25" 
                    status="LIVE" 
                    participants="214 active" 
                    date="Started 15m ago" 
                />
            </Link>
            <EventCard 
                title="Q1 All Hands Meeting" 
                code="#Q1ALL" 
                status="READY" 
                participants="0 registered" 
                date="Tomorrow, 10:00 AM" 
            />
            <EventCard 
                title="Design Systems Workshop" 
                code="#DS2025" 
                status="DRAFT" 
                participants="-" 
                date="No date set" 
            />
            <EventCard 
                title="Cyber Security Basics" 
                code="#SEC101" 
                status="ENDED" 
                participants="856 attendees" 
                date="Oct 12, 2024" 
            />
        </div>
    </div>
  );
};

// --- Layout ---

const HostDashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex text-foreground font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-[#05070B] flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/5">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">EF</div>
                <span className="font-display font-bold text-lg tracking-tight">EventFlow</span>
             </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Events" to="/host" active={location.pathname === '/host'} />
            <SidebarItem icon={MessageSquare} label="Question Bank" to="/host/questions" active={location.pathname.includes('questions')} />
            <SidebarItem icon={BarChart2} label="Analytics" to="/host/analytics" active={location.pathname.includes('analytics')} />
            <SidebarItem icon={Settings} label="Settings" to="/host/settings" active={location.pathname.includes('settings')} />
        </div>

        <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
                </div>
                <Settings className="w-4 h-4 text-muted-foreground" />
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
         {/* Only show top bar on dashboard, simpler layout for live command if desired, but keeping consistent for now */}
         <div className="flex-1 p-8 overflow-y-auto">
            <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/live" element={<LiveCommandCenter />} />
            </Routes>
         </div>
      </div>
    </div>
  );
};

export default HostDashboard;
