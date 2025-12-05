import React, { useState } from 'react';
import { 
  Users, BarChart2, CheckCircle, Brain, 
  ArrowUpRight, ArrowDownRight, TrendingUp
} from 'lucide-react';
import { EFCard, EFCardContent, EFCardHeader, EFCardTitle } from "@/components/ui/ef-card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

const MetricCard = ({ title, value, change, trend }) => (
  <EFCard className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <EFCardContent className="p-6 space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
              <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {change}
              </div>
          </div>
      </EFCardContent>
  </EFCard>
);

const ChartMock = () => (
    <div className="h-[300px] w-full bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden flex items-end px-4 pb-0 gap-2">
        {/* Simple bar chart simulation */}
        {[45, 60, 75, 50, 80, 95, 85, 70, 65, 88, 92, 78, 60, 50, 80].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/10 rounded-t-md relative group hover:bg-primary/20 transition-colors">
                <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-blue-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${h}%` }}
                />
                {/* Tooltip mock */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    {h}% Engagement
                </div>
            </div>
        ))}
    </div>
);

const Analytics = () => {
  const [view, setView] = useState('overview');
  const [event, setEvent] = useState('java');

  const handleViewChange = (newView) => {
      setView(newView);
      toast.info(`Switched to ${newView} view`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
        {/* Header */}
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900">Analytics</h1>
                <p className="text-muted-foreground mt-1">Understand engagement across your events.</p>
            </div>
            <div className="flex gap-4">
                <Select value={event} onValueChange={(val) => { setEvent(val); toast.success(`Loaded data for ${val === 'java' ? 'Advanced Java' : 'Python Workshop'}`); }}>
                    <SelectTrigger className="w-[240px] bg-white border-slate-200"><SelectValue placeholder="Select Event" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="java">Adv. Java Architecture</SelectItem>
                        <SelectItem value="python">Python Workshop</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    {['Overview', 'Interactions', 'Participants'].map(v => (
                        <button 
                            key={v}
                            onClick={() => handleViewChange(v.toLowerCase())}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                view === v.toLowerCase() 
                                    ? 'bg-white shadow-sm text-slate-900' 
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {view === 'overview' && (
            <>
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MetricCard title="Total Participants" value={event === 'java' ? "1,284" : "856"} change="12%" trend="up" />
                    <MetricCard title="Avg Participation" value="84%" change="5%" trend="up" />
                    <MetricCard title="Questions Answered" value="8,942" change="8%" trend="up" />
                    <MetricCard title="Avg Quiz Score" value="72%" change="3%" trend="down" />
                </div>

                {/* Main Chart Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <EFCard className="h-full bg-white border-slate-200 shadow-sm">
                            <EFCardHeader>
                                <EFCardTitle className="text-slate-900">Engagement Over Time</EFCardTitle>
                            </EFCardHeader>
                            <EFCardContent>
                                <ChartMock />
                            </EFCardContent>
                        </EFCard>
                    </div>
                    
                    <div className="space-y-6">
                        <EFCard className="bg-white border-slate-200 shadow-sm">
                            <EFCardHeader>
                                <EFCardTitle className="text-slate-900 text-sm">Question Performance</EFCardTitle>
                            </EFCardHeader>
                            <EFCardContent>
                                <div className="space-y-4">
                                    {[
                                        { l: 'Q1: Patterns', v: 92, c: 'bg-green-500' },
                                        { l: 'Q2: Garbage Coll.', v: 45, c: 'bg-red-500' },
                                        { l: 'Q3: Microservices', v: 78, c: 'bg-blue-500' }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-1">
                                            <div className="flex justify-between text-xs text-slate-600">
                                                <span>{item.l}</span>
                                                <span className="font-bold">{item.v}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${item.c}`} style={{ width: `${item.v}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </EFCardContent>
                        </EFCard>

                        <EFCard className="bg-white border-slate-200 shadow-sm">
                            <EFCardHeader>
                                <EFCardTitle className="text-slate-900 text-sm">Pace & Mood</EFCardTitle>
                            </EFCardHeader>
                            <EFCardContent>
                                <div className="flex gap-2 h-4 rounded-full overflow-hidden">
                                    <div className="w-[20%] bg-red-400" title="Too Slow" />
                                    <div className="w-[60%] bg-green-500" title="Perfect" />
                                    <div className="w-[20%] bg-yellow-400" title="Too Fast" />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                    <span>Too Slow</span>
                                    <span>Perfect</span>
                                    <span>Too Fast</span>
                                </div>
                            </EFCardContent>
                        </EFCard>
                    </div>
                </div>
            </>
        )}

        {view === 'interactions' && (
             <div className="flex items-center justify-center h-96 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-muted-foreground">
                Detailed interaction analytics view placeholder
            </div>
        )}
        
        {view === 'participants' && (
             <div className="flex items-center justify-center h-96 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-muted-foreground">
                Participant leaderboard view placeholder
            </div>
        )}
    </div>
  );
};

export default Analytics;
