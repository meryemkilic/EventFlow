import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Smartphone, MonitorPlay } from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { EFCard, EFCardContent } from "@/components/ui/ef-card";
import { Toaster } from "@/components/ui/sonner"; // Add Toaster

// Layouts
import HostLayout from '@/pages/host/HostLayout';
import ParticipantApp from '@/pages/participant/ParticipantApp';
import StageView from '@/pages/stage/StageView';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <div className="max-w-4xl w-full z-10 space-y-12 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v0.3 Design System Prototype (Fully Interactive)
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground">
            Event<span className="text-primary">Flow</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The Cyber-Professional event engagement platform. 
            Choose your interface to explore the design system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Host Card */}
          <Link to="/host/events/1" className="group">
            <EFCard className="h-full border-slate-200 bg-white hover:border-primary/50 transition-all duration-300 group-hover:translate-y-[-5px] shadow-sm hover:shadow-md">
              <EFCardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-white flex items-center justify-center border border-slate-200 group-hover:border-primary/50 group-hover:shadow-lg transition-all">
                  <LayoutDashboard className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Host Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Control center for event organizers. Analytics, moderation, and timeline management.</p>
                </div>
                <EFButton variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                  Launch Dashboard
                </EFButton>
              </EFCardContent>
            </EFCard>
          </Link>

          {/* Participant Card */}
          <Link to="/participant" className="group">
            <EFCard className="h-full border-slate-200 bg-white hover:border-primary/50 transition-all duration-300 group-hover:translate-y-[-5px] shadow-sm hover:shadow-md">
              <EFCardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-white flex items-center justify-center border border-slate-200 group-hover:border-primary/50 group-hover:shadow-lg transition-all">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Participant View</h3>
                  <p className="text-sm text-muted-foreground">Mobile-first experience for attendees. Polls, Q&A, and gamification.</p>
                </div>
                <EFButton variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                  Join as Attendee
                </EFButton>
              </EFCardContent>
            </EFCard>
          </Link>

          {/* Stage Card */}
          <Link to="/stage" className="group">
            <EFCard className="h-full border-slate-200 bg-white hover:border-primary/50 transition-all duration-300 group-hover:translate-y-[-5px] shadow-sm hover:shadow-md">
              <EFCardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-white flex items-center justify-center border border-slate-200 group-hover:border-primary/50 group-hover:shadow-lg transition-all">
                  <MonitorPlay className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Stage Display</h3>
                  <p className="text-sm text-muted-foreground">High-contrast projector view for live results and Q&A.</p>
                </div>
                <EFButton variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                  Open Stage View
                </EFButton>
              </EFCardContent>
            </EFCard>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* New Host Layout with sub-routes */}
        <Route path="/host/*" element={<HostLayout />} />
        
        <Route path="/participant/*" element={<ParticipantApp />} />
        <Route path="/stage/*" element={<StageView />} />
      </Routes>
    </Router>
  );
}

export default App;
