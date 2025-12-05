import React, { useState } from 'react';
import { 
  Play, Square, SkipForward, Lock, Users, Clock, ThumbsUp, 
  Check, X, Star, MoreHorizontal, BarChart, Activity, MessageCircle 
} from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { EFCard, EFCardContent } from "@/components/ui/ef-card";
import { EFBadge } from "@/components/ui/ef-badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TimelineItem = ({ type, title, active, completed }) => (
  <div className={`group flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
    active 
        ? 'bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(41,98,255,0.15)]' 
        : completed 
            ? 'bg-white/5 border-transparent opacity-60' 
            : 'bg-card border-white/5 hover:border-white/20'
  }`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
        active ? 'bg-primary text-white' : 'bg-white/10 text-muted-foreground'
    }`}>
        {type === 'POLL' ? 'P' : type === 'QUIZ' ? 'Q' : 'W'}
    </div>
    <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${active ? 'text-white' : 'text-muted-foreground'}`}>{title}</p>
    </div>
    {active && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
  </div>
);

const IncomingQuestion = ({ text, author, time }) => (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-3 hover:bg-white/[0.07] transition-colors">
        <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-[10px] bg-purple-500/20 text-purple-400">JD</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{author}</span>
            </div>
            <span className="text-[10px] text-muted-foreground/50">{time}</span>
        </div>
        <p className="text-sm text-white leading-relaxed">{text}</p>
        <div className="flex justify-end gap-2">
             <button className="p-1.5 rounded-md hover:bg-green-500/20 text-muted-foreground hover:text-green-500 transition-colors"><Check className="w-4 h-4" /></button>
             <button className="p-1.5 rounded-md hover:bg-red-500/20 text-muted-foreground hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
             <button className="p-1.5 rounded-md hover:bg-yellow-500/20 text-muted-foreground hover:text-yellow-500 transition-colors"><Star className="w-4 h-4" /></button>
        </div>
    </div>
);

const LiveCommandCenter = () => {
  const [status, setStatus] = useState('active'); // active, stopped

  return (
    <div className="h-[calc(100vh-4rem)] grid grid-cols-12 gap-6">
      
      {/* Left: Timeline (3 cols) */}
      <div className="col-span-3 flex flex-col gap-4 border-r border-white/5 pr-6">
        <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-lg">Timeline</h3>
            <span className="text-xs text-muted-foreground">5 / 12 items</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            <TimelineItem type="POLL" title="Warm up: How are you feeling?" completed />
            <TimelineItem type="QUIZ" title="Java Basics Check" completed />
            <TimelineItem type="POLL" title="Microservices Experience" completed />
            <TimelineItem type="POLL" title="Architecture Patterns Vote" active />
            <TimelineItem type="QUIZ" title="Advanced Garbage Collection" />
            <TimelineItem type="WORD" title="One word takeaway" />
            <TimelineItem type="POLL" title="Feedback" />
        </div>
      </div>

      {/* Middle: Center Stage (6 cols) */}
      <div className="col-span-6 flex flex-col">
        
        {/* Top Stats */}
        <div className="flex justify-between items-center mb-6 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-bold tracking-wide text-sm">LIVE</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-lg font-bold">00:45:12</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">214 participants</span>
            </div>
        </div>

        {/* Active Interaction Preview */}
        <EFCard className="flex-1 flex flex-col relative overflow-hidden border-primary/30 bg-gradient-to-b from-card to-[#0a0f1a]">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-primary/10 blur-[80px] pointer-events-none" />
            
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-8 z-10">
                <div className="space-y-4 max-w-md">
                    <EFBadge variant="default" className="mb-2">Live Poll</EFBadge>
                    <h2 className="text-3xl font-display font-bold text-white leading-tight">
                        Which architecture pattern do you use most in production?
                    </h2>
                </div>
                
                <div className="w-full max-w-sm space-y-3">
                    {/* Mock Results Preview */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Microservices</span>
                            <span>62%</span>
                        </div>
                        <Progress value={62} className="h-2 bg-white/5" indicatorClassName="bg-primary" />
                    </div>
                     <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Monolith</span>
                            <span>24%</span>
                        </div>
                        <Progress value={24} className="h-2 bg-white/5" indicatorClassName="bg-primary/50" />
                    </div>
                     <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Serverless</span>
                            <span>14%</span>
                        </div>
                        <Progress value={14} className="h-2 bg-white/5" indicatorClassName="bg-primary/30" />
                    </div>
                </div>
            </div>

            {/* Controls Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 flex items-center justify-center gap-4">
                <EFButton variant="secondary" size="icon" className="rounded-full h-12 w-12">
                    <SkipForward className="w-5 h-5" />
                </EFButton>
                
                {status === 'active' ? (
                    <EFButton 
                        variant="destructive" 
                        size="lg" 
                        className="h-14 px-8 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.3)] font-bold text-lg gap-2"
                        onClick={() => setStatus('stopped')}
                    >
                        <Square className="w-5 h-5 fill-current" /> Stop Voting
                    </EFButton>
                ) : (
                     <EFButton 
                        variant="primary" 
                        size="lg" 
                        className="h-14 px-8 rounded-full shadow-[0_0_20px_rgba(41,98,255,0.4)] font-bold text-lg gap-2"
                        onClick={() => setStatus('active')}
                    >
                        <Play className="w-5 h-5 fill-current" /> Re-Launch
                    </EFButton>
                )}

                <EFButton variant="secondary" size="icon" className="rounded-full h-12 w-12">
                    <Lock className="w-5 h-5" />
                </EFButton>
            </div>
        </EFCard>

      </div>

      {/* Right: Feeds (3 cols) */}
      <div className="col-span-3 border-l border-white/5 pl-6 flex flex-col h-full">
        <Tabs defaultValue="moderation" className="h-full flex flex-col">
            <TabsList className="w-full bg-white/5 border border-white/10">
                <TabsTrigger value="moderation" className="flex-1">Moderation</TabsTrigger>
                <TabsTrigger value="pulse" className="flex-1">Pulse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="moderation" className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2 scrollbar-thin">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Incoming (3)</span>
                    <EFButton variant="ghost" size="sm" className="h-6 text-xs">Clear All</EFButton>
                </div>
                <IncomingQuestion 
                    author="Sarah Chen" 
                    time="Just now" 
                    text="Can you explain the difference between Saga pattern and 2PC again?" 
                />
                 <IncomingQuestion 
                    author="Anonymous" 
                    time="2m ago" 
                    text="Is this recorded?" 
                />
                 <IncomingQuestion 
                    author="Mike Ross" 
                    time="5m ago" 
                    text="What about latency in this approach?" 
                />
            </TabsContent>

             <TabsContent value="pulse" className="mt-4 space-y-6">
                {/* Pace Gauge */}
                <div className="space-y-2 text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <h4 className="text-sm font-medium text-muted-foreground">Audience Pace</h4>
                    <div className="flex justify-between items-end h-24 relative">
                        {/* Mock Gauge Visual */}
                         <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center">
                             <div className="w-32 h-16 border-t-4 border-l-4 border-r-4 border-white/10 rounded-t-full relative overflow-hidden">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-green-500 origin-bottom rotate-[-15deg] transition-transform" />
                             </div>
                         </div>
                         <span className="text-xs font-bold text-yellow-500">Too Slow</span>
                         <span className="text-xs font-bold text-green-500 translate-y-[-40px]">Perfect</span>
                         <span className="text-xs font-bold text-red-500">Too Fast</span>
                    </div>
                    <p className="text-xs text-green-400">Cruising speed. Keep it up!</p>
                </div>

                {/* Reaction Stream Mock */}
                <div className="space-y-2">
                     <h4 className="text-sm font-medium text-muted-foreground">Live Reactions</h4>
                     <div className="h-32 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden flex items-end justify-center p-4">
                         {/* Particles */}
                         <div className="absolute bottom-4 left-4 text-xl animate-float opacity-60">👍</div>
                         <div className="absolute bottom-8 right-8 text-xl animate-bounce opacity-40">❤️</div>
                         <div className="absolute bottom-2 left-1/2 text-xl animate-pulse opacity-80">🔥</div>
                         <div className="text-xs text-muted-foreground">Reactions appear here...</div>
                     </div>
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LiveCommandCenter;
