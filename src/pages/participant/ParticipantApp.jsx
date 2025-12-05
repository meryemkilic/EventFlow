import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MessageSquare, Heart, Zap, HelpCircle, Send, X, Check } from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EFCard } from "@/components/ui/ef-card";

// --- Components ---

const BottomDock = () => {
  const [showReactions, setShowReactions] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  return (
    <>
      {/* Reaction Palette */}
      {showReactions && (
        <div className="fixed bottom-24 right-6 flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in duration-200 z-50">
            {['🔥', '❤️', '👏', '🤯', '🎉'].map((emoji, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-card border border-white/10 shadow-lg flex items-center justify-center text-xl hover:scale-110 transition-transform">
                    {emoji}
                </button>
            ))}
        </div>
      )}

      {/* Question Modal Overlay */}
      {showQuestion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#0B0F16] border border-white/10 rounded-t-2xl sm:rounded-2xl p-6 space-y-4 animate-in slide-in-from-bottom-10 duration-300">
                <div className="flex justify-between items-center">
                    <h3 className="font-display font-bold text-lg text-white">Ask a Question</h3>
                    <button onClick={() => setShowQuestion(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 min-h-[120px]" 
                    placeholder="Type your question for the host..."
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="anon" className="rounded bg-white/10 border-white/20" />
                        <label htmlFor="anon" className="text-sm text-muted-foreground">Ask anonymously</label>
                    </div>
                    <EFButton size="sm" onClick={() => setShowQuestion(false)}>
                        <Send className="w-4 h-4 mr-2" /> Send
                    </EFButton>
                </div>
            </div>
        </div>
      )}

      {/* Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent z-40">
        <div className="max-w-md mx-auto flex justify-between items-center">
            <button 
                onClick={() => setShowQuestion(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#0B0F16] border border-white/10 text-muted-foreground hover:text-white hover:border-white/20 transition-all shadow-lg"
            >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium text-sm">Ask</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-green-500 font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
            </div>

            <button 
                onClick={() => setShowReactions(!showReactions)}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-blue-400 shadow-[0_0_20px_rgba(41,98,255,0.4)] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
            >
                {showReactions ? <X className="w-6 h-6" /> : <Heart className="w-6 h-6 fill-current" />}
            </button>
        </div>
      </div>
    </>
  );
};

// --- Screens ---

const JoinScreen = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('#');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8 relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-background pointer-events-none" />
       
       <div className="z-10 w-full max-w-xs space-y-8 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl shadow-primary/30">EF</div>
            </div>
            
            <div className="space-y-2">
                <h1 className="text-2xl font-display font-bold text-white">Join Event</h1>
                <p className="text-sm text-muted-foreground">Enter the code displayed on stage</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2 text-left">
                    <label className="text-xs font-medium text-muted-foreground ml-1">EVENT CODE</label>
                    <Input 
                        className="h-14 text-center text-xl font-mono tracking-widest bg-white/5 border-white/10 focus:border-primary/50 uppercase" 
                        placeholder="#CODE" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                 <div className="space-y-2 text-left">
                    <label className="text-xs font-medium text-muted-foreground ml-1">NICKNAME</label>
                    <Input 
                        className="h-14 text-center text-lg bg-white/5 border-white/10 focus:border-primary/50" 
                        placeholder="e.g. Alex" 
                    />
                </div>
            </div>

            <EFButton 
                className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20" 
                onClick={() => navigate('/participant/lobby')}
            >
                Join Event
            </EFButton>

            <p className="text-xs text-muted-foreground">By joining you agree to our Terms of Service</p>
       </div>
    </div>
  );
};

const WaitingScreen = () => {
   const navigate = useNavigate();
   
   // Simulate event start after 3s
   React.useEffect(() => {
     const timer = setTimeout(() => navigate('/participant/live'), 3000);
     return () => clearTimeout(timer);
   }, [navigate]);

   return (
     <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative">
        <div className="space-y-6 z-10">
            <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center mx-auto">
                     <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                     </div>
                </div>
                <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">Waiting for host...</h2>
                <p className="text-muted-foreground text-sm mt-2">Advanced Java Architecture 2025</p>
            </div>
        </div>
        
        {/* Pace Feedback Mock */}
        <div className="absolute bottom-32 left-0 right-0 px-6">
             <p className="text-xs text-muted-foreground text-center mb-3">How is the pace?</p>
             <div className="flex justify-center gap-3">
                <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10">🐢 Too Slow</button>
                <button className="px-4 py-2 rounded-full bg-primary/10 border border-primary/50 text-xs font-medium text-primary">👌 Perfect</button>
                <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10">🐇 Too Fast</button>
             </div>
        </div>
        
        <BottomDock />
     </div>
   );
};

const LiveInteraction = () => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto pb-32">
            <div className="flex justify-between items-center py-4 border-b border-white/5 mb-6">
                 <span className="text-xs font-mono text-muted-foreground">#JAVA25</span>
                 <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                     <span className="text-xs font-bold text-red-500">00:30</span>
                 </div>
            </div>

            <div className="space-y-8 flex-1">
                <h2 className="text-2xl font-display font-bold text-white leading-snug">
                    Which architecture pattern do you use most in production?
                </h2>

                <div className="space-y-3">
                    {['Microservices', 'Monolith', 'Serverless', 'Event-Driven'].map((opt, i) => (
                        <button
                            key={opt}
                            onClick={() => !submitted && setSelected(i)}
                            className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                                selected === i 
                                    ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(41,98,255,0.3)]' 
                                    : 'bg-[#0B0F16] border-white/10 text-muted-foreground hover:border-white/20'
                            } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                            <span className="font-medium relative z-10">{opt}</span>
                            {submitted && selected === i && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                                    <Check className="w-5 h-5" />
                                </div>
                            )}
                            {/* Result Bar Overlay if needed */}
                        </button>
                    ))}
                </div>

                {!submitted ? (
                    <EFButton 
                        className="w-full py-6 text-lg font-bold shadow-xl shadow-primary/20 mt-auto"
                        disabled={selected === null}
                        onClick={() => setSubmitted(true)}
                    >
                        Submit Answer
                    </EFButton>
                ) : (
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in zoom-in duration-300">
                        <p className="text-green-400 font-medium flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" /> Answer Sent!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Waiting for results...</p>
                    </div>
                )}
            </div>

            <BottomDock />
        </div>
    );
};

const ParticipantApp = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
            <Routes>
                <Route path="/" element={<JoinScreen />} />
                <Route path="/lobby" element={<WaitingScreen />} />
                <Route path="/live" element={<LiveInteraction />} />
            </Routes>
        </div>
    );
};

export default ParticipantApp;
