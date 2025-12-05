import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User, Users, Trophy } from 'lucide-react';
import { EFCard } from "@/components/ui/ef-card";

// Mock QR if library missing
const MockQRCode = () => (
    <div className="w-64 h-64 bg-white p-4 rounded-2xl flex items-center justify-center">
        <div className="w-full h-full bg-black grid grid-cols-6 grid-rows-6 gap-1 opacity-80">
             {/* Just a pattern */}
             {[...Array(36)].map((_, i) => (
                 <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
             ))}
        </div>
    </div>
);

const StageLobby = () => {
  const [joiners, setJoiners] = useState([]);

  // Simulate joiners
  useEffect(() => {
    const names = ["Alex", "Sarah", "Mike", "Jessica", "David", "Emily", "Chris", "Pat"];
    const interval = setInterval(() => {
        const name = names[Math.floor(Math.random() * names.length)];
        setJoiners(prev => [...prev.slice(-4), { name, id: Date.now() }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070B] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[150px] opacity-40 animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[150px] opacity-40 animate-pulse-slow" />
        </div>

        <div className="z-10 flex flex-col items-center space-y-12 text-center scale-125">
            <h1 className="text-6xl font-display font-bold text-white tracking-tight">
                Join the session
            </h1>
            
            <div className="p-8 bg-white rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.2)]">
                <MockQRCode />
            </div>

            <div className="space-y-4">
                <p className="text-3xl text-muted-foreground font-light">Go to <span className="text-white font-bold">eventflow.com</span></p>
                <div className="inline-block px-12 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
                    <p className="text-2xl text-muted-foreground uppercase tracking-widest mb-1">Code</p>
                    <p className="text-6xl font-mono font-bold text-primary tracking-wider">#JAVA25</p>
                </div>
            </div>
        </div>

        {/* Joining Feed */}
        <div className="absolute bottom-12 right-12 flex flex-col gap-4 items-end">
            {joiners.map((user) => (
                <div key={user.id} className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full animate-in slide-in-from-right fade-in duration-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                    <span className="text-xl font-medium text-white">{user.name} joined</span>
                </div>
            ))}
        </div>
        
        <div className="absolute top-12 right-12 flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <Users className="w-6 h-6 text-white" />
            <span className="text-2xl font-bold text-white">214</span>
        </div>
    </div>
  );
};

const StageLive = () => {
  return (
    <div className="min-h-screen bg-[#05070B] flex flex-col p-24 relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
            <h2 className="text-6xl font-display font-bold text-white max-w-5xl leading-tight">
                Which architecture pattern do you use most in production?
            </h2>
             <div className="flex flex-col items-end gap-2">
                <div className="px-8 py-3 bg-white/5 rounded-full border border-white/10 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_#ef4444]" />
                    <span className="text-2xl font-mono font-bold text-white">00:15</span>
                </div>
                <span className="text-xl text-muted-foreground">182 votes</span>
             </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 grid grid-rows-4 gap-8 max-w-6xl w-full mx-auto">
            {[
                { label: "Microservices", val: 62, color: "bg-primary" },
                { label: "Monolith", val: 24, color: "bg-purple-500" },
                { label: "Serverless", val: 14, color: "bg-pink-500" },
                { label: "Event-Driven", val: 45, color: "bg-cyan-500" } // Adding extra for demo visual
            ].map((item, i) => (
                <div key={i} className="relative flex items-center">
                    <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10" />
                    <div 
                        className={`absolute inset-y-0 left-0 rounded-2xl ${item.color} opacity-80 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out`} 
                        style={{ width: `${item.val}%` }}
                    >
                         {/* Glow effect on edge */}
                         <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-md" />
                    </div>
                    
                    <div className="relative z-10 w-full flex justify-between items-center px-8 py-6">
                        <span className="text-4xl font-bold text-white drop-shadow-md">{item.label}</span>
                        <span className="text-4xl font-mono font-bold text-white drop-shadow-md">{item.val}%</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer ticker or branding */}
        <div className="absolute bottom-12 left-0 w-full text-center">
            <p className="text-2xl text-white/20 font-display font-bold tracking-[1em]">EVENTFLOW</p>
        </div>
    </div>
  );
};

const StageView = () => {
    const [mode, setMode] = useState('lobby'); // lobby, live

    // Simple toggle for prototype exploration
    return (
        <div onClick={() => setMode(mode === 'lobby' ? 'live' : 'lobby')}>
            {mode === 'lobby' ? <StageLobby /> : <StageLive />}
        </div>
    );
};

export default StageView;
