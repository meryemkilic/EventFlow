import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Users, BarChart2, MoreVertical, Copy, 
  MessageSquare, Star, Edit3, Zap, Plus, Sparkles, 
  GripVertical, Timer, Trash2, Eye, Save, ArrowRight,
  CheckCircle, ChevronDown, ChevronUp, GripHorizontal, Share2,
  List, LayoutList, Trophy
} from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { EFCard, EFCardContent, EFCardHeader, EFCardTitle } from "@/components/ui/ef-card";
import { EFBadge } from "@/components/ui/ef-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AddInteractionWizard from '@/components/host/AddInteractionWizard';

// --- Sub-components ---

const OverviewTab = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Event Basics */}
      <div className="col-span-2 space-y-6">
          <EFCard className="bg-white shadow-sm border-slate-200">
              <EFCardHeader>
                  <EFCardTitle className="text-slate-900">Event Basics</EFCardTitle>
              </EFCardHeader>
              <EFCardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label>Event Name</Label>
                          <Input defaultValue="Advanced Java Architecture 2025" className="bg-white font-medium text-lg" />
                      </div>
                      <div className="space-y-2">
                          <Label>Event Code</Label>
                          <div className="relative flex items-center">
                              <span className="absolute left-3 text-muted-foreground font-mono font-bold">#</span>
                              <Input defaultValue="JAVA25" className="pl-7 bg-white font-mono uppercase" />
                              <EFButton size="icon" variant="ghost" className="ml-2" title="Regenerate"><Sparkles className="w-4 h-4 text-purple-500" /></EFButton>
                          </div>
                      </div>
                  </div>
                  
                  <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea className="min-h-[80px] bg-white resize-none" defaultValue="Deep dive into microservices, patterns, and performance tuning for senior engineers." />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-2">
                          <Label>Date</Label>
                          <Input type="date" className="bg-white" />
                      </div>
                      <div className="space-y-2">
                          <Label>Time</Label>
                          <Input type="time" className="bg-white" />
                      </div>
                      <div className="space-y-2">
                          <Label>Duration</Label>
                          <Select defaultValue="90">
                              <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="30">30 min</SelectItem>
                                  <SelectItem value="60">60 min</SelectItem>
                                  <SelectItem value="90">90 min</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                  </div>

                  <div className="space-y-2">
                       <Label>Timezone</Label>
                       <Select defaultValue="utc">
                            <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                                <SelectItem value="est">EST (GMT-5)</SelectItem>
                            </SelectContent>
                       </Select>
                  </div>

                  {/* Advanced Collapsible */}
                  <div className="border-t border-slate-100 pt-4">
                      <button 
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-blue-700 transition-colors"
                      >
                          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          Advanced Basics
                      </button>
                      
                      {showAdvanced && (
                          <div className="mt-4 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                              <div className="space-y-2">
                                  <Label>Event Type</Label>
                                  <Select defaultValue="lecture">
                                      <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="lecture">Lecture</SelectItem>
                                          <SelectItem value="workshop">Workshop</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                              <div className="space-y-2">
                                  <Label>Language</Label>
                                  <Select defaultValue="en">
                                      <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="en">English</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                              <div className="col-span-2 space-y-2">
                                  <Label>Join Policy</Label>
                                  <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                                          <input type="radio" name="policy" defaultChecked className="accent-primary" />
                                          Anyone with code
                                      </label>
                                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                                          <input type="radio" name="policy" className="accent-primary" />
                                          Require login
                                      </label>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              </EFCardContent>
          </EFCard>
      </div>

      {/* Right Column: Engagement Summary */}
      <div className="space-y-6">
          <EFCard className="bg-white shadow-sm border-slate-200">
              <EFCardHeader>
                  <EFCardTitle className="text-slate-900">Engagement Summary</EFCardTitle>
              </EFCardHeader>
              <EFCardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-center">
                          <div className="text-2xl font-bold text-slate-900">84%</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Participation</div>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-center">
                          <div className="text-2xl font-bold text-primary">12</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Interactions</div>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-center">
                          <div className="text-2xl font-bold text-green-600">4.8</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Feedback</div>
                      </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                      <EFBadge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                          <Clock className="w-3 h-3 mr-1" /> Est. ~25 min
                      </EFBadge>
                      <EFBadge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                          <Zap className="w-3 h-3 mr-1" /> High Engagement
                      </EFBadge>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 text-xs text-muted-foreground flex justify-between items-center">
                      <span>Last edited 15m ago by Admin</span>
                      <button className="text-primary hover:underline">Undo</button>
                  </div>
              </EFCardContent>
          </EFCard>
      </div>
    </div>
  );
};

const TimelineItem = ({ id, type, title, meta, active, onDelete, onSelect, viewMode }) => (
  <div 
      onClick={() => onSelect(id)}
      className={cn(
      "group relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 bg-white cursor-pointer hover:shadow-md",
      active ? "border-primary shadow-[0_0_0_1px_rgba(41,98,255,1)] z-10" : "border-slate-200 hover:border-primary/30"
  )}>
    <div className="text-slate-300 group-hover:text-slate-500 cursor-grab pt-1"><GripVertical className="w-5 h-5" /></div>
    
    <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0",
        type === 'Quiz' ? "bg-purple-100 text-purple-600" :
        type === 'Poll' ? "bg-blue-100 text-blue-600" : 
        "bg-teal-100 text-teal-600"
    )}>
        {type[0]}
    </div>
    
    <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
             <h4 className="text-sm font-semibold text-slate-900 truncate">{title}</h4>
        </div>
        
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
             <EFBadge variant="outline" className="text-[10px] h-5 px-1.5 bg-slate-50 border-slate-200 text-slate-600">{type}</EFBadge>
             {meta.map((m, i) => (
                <EFBadge key={i} variant="outline" className="text-[10px] h-5 px-1.5 bg-slate-50 border-slate-200 text-slate-600">{m}</EFBadge>
            ))}
        </div>

        {viewMode === 'detailed' && (
            <div className="mt-3 p-2 bg-slate-50 rounded border border-slate-100 text-xs text-slate-500">
                Preview of question text goes here...
            </div>
        )}
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <EFButton variant="ghost" size="icon" className="h-6 w-6 hover:text-primary" title="Duplicate"><Copy className="w-3 h-3" /></EFButton>
        <EFButton variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); onDelete(id); }}><Trash2 className="w-3 h-3" /></EFButton>
    </div>
  </div>
);

const TimelineTab = () => {
  const [items, setItems] = useState([
    { id: 1, type: 'Poll', title: "Warm up: How are you feeling?", meta: ['Live Results'] },
    { id: 2, type: 'Quiz', title: "Java Basics Check", meta: ['45s', 'Score+XP'] },
    { id: 3, type: 'Word Cloud', title: "Describe Microservices", meta: ['3 entries'] },
  ]);
  const [activeId, setActiveId] = useState(2);
  const [viewMode, setViewMode] = useState('compact');
  const [showWizard, setShowWizard] = useState(false);

  const handleDelete = (id) => {
      setItems(items.filter(i => i.id !== id));
      toast.success("Interaction removed");
  };

  const handleWizardComplete = (newItem) => {
      const newId = Date.now();
      setItems([...items, { id: newId, ...newItem }]);
      setActiveId(newId);
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-240px)] min-h-[600px]">
         {/* Left: Timeline List */}
         <div className="col-span-8 flex flex-col h-full bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden">
             {/* Toolbar */}
             <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
                 <div className="flex gap-2">
                    <EFButton size="sm" className="bg-primary text-white shadow-sm" onClick={() => setShowWizard(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Add Interaction
                    </EFButton>
                    <EFButton variant="outline" size="sm" className="bg-white">
                        <Sparkles className="w-3.5 h-3.5 mr-2 text-purple-500" /> AI Generate
                    </EFButton>
                 </div>
                 <div className="flex items-center gap-3 text-xs">
                     <span className="text-muted-foreground font-medium">Total: ~25m</span>
                     <div className="h-4 w-px bg-slate-200" />
                     <div className="flex bg-slate-100 p-0.5 rounded-lg">
                         <button onClick={() => setViewMode('compact')} className={cn("p-1 rounded-md transition-all", viewMode === 'compact' ? "bg-white shadow-sm text-slate-900" : "text-slate-500")}><List className="w-3.5 h-3.5" /></button>
                         <button onClick={() => setViewMode('detailed')} className={cn("p-1 rounded-md transition-all", viewMode === 'detailed' ? "bg-white shadow-sm text-slate-900" : "text-slate-500")}><LayoutList className="w-3.5 h-3.5" /></button>
                     </div>
                 </div>
             </div>

             {/* Sections & List */}
             <div className="flex-1 overflow-y-auto p-4 space-y-6">
                 {/* Section: Warm-up */}
                 <div className="space-y-3">
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                         <ChevronDown className="w-3 h-3" /> Warm-up (5 min)
                     </div>
                     <div className="space-y-2">
                        {items.map(item => (
                             <TimelineItem 
                                key={item.id} 
                                {...item} 
                                active={item.id === activeId} 
                                onDelete={handleDelete}
                                onSelect={setActiveId}
                                viewMode={viewMode}
                             />
                         ))}
                     </div>
                 </div>
                 
                 {/* Placeholder for Add Section */}
                 <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 hover:border-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-all">
                     + Add Section
                 </button>
             </div>
         </div>
    
         {/* Right: Inspector Panel */}
         <div className="col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden h-full">
             {/* Inspector Header */}
             <div className="p-4 border-b border-slate-100 bg-white">
                 <div className="flex items-center gap-2 mb-2">
                     <EFBadge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">Quiz</EFBadge>
                     <span className="text-xs text-slate-400">ID: {activeId}</span>
                 </div>
                 <Input 
                    className="h-8 font-semibold text-lg border-transparent hover:border-slate-200 px-0 focus:px-2 transition-all" 
                    value={items.find(i => i.id === activeId)?.title || ''}
                    onChange={(e) => setItems(items.map(i => i.id === activeId ? {...i, title: e.target.value} : i))}
                 />
             </div>
             
             {/* Tabs */}
             <Tabs defaultValue="content" className="flex-1 flex flex-col">
                 <TabsList className="w-full justify-start px-4 pt-2 h-10 bg-white border-b border-slate-100 rounded-none space-x-4">
                     <TabsTrigger value="content" className="h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0">Content</TabsTrigger>
                     <TabsTrigger value="behavior" className="h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0">Behavior</TabsTrigger>
                     <TabsTrigger value="gamification" className="h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0">Gamification</TabsTrigger>
                 </TabsList>

                 <div className="flex-1 overflow-y-auto p-5">
                     <TabsContent value="content" className="space-y-4 mt-0">
                        <div className="space-y-2">
                            <Label>Question Text</Label>
                            <Textarea className="min-h-[100px] resize-none" placeholder="Enter your question..." defaultValue="Which architecture pattern is this?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Options</Label>
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="flex gap-2">
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 mt-2">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                        <Input className="h-9" placeholder={`Option ${i}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                     </TabsContent>
                     
                     <TabsContent value="behavior" className="space-y-4 mt-0">
                         <div className="space-y-4">
                             <div className="flex justify-between items-center">
                                 <Label>Timer</Label>
                                 <Select defaultValue="45"><SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="45">45s</SelectItem></SelectContent></Select>
                             </div>
                             <div className="flex justify-between items-center">
                                 <Label>Allow change answer</Label>
                                 <Switch />
                             </div>
                         </div>
                     </TabsContent>

                     <TabsContent value="gamification" className="space-y-4 mt-0">
                         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center space-y-2">
                             <Trophy className="w-8 h-8 text-yellow-500 mx-auto" />
                             <p className="text-sm font-medium">Score + XP</p>
                             <p className="text-xs text-muted-foreground">Participants earn points for correctness and speed.</p>
                         </div>
                     </TabsContent>
                 </div>
             </Tabs>

             {/* Footer */}
             <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                 <EFButton className="flex-1 bg-primary hover:bg-blue-700 text-white" onClick={() => toast.success("Saved")}>
                    <Save className="w-4 h-4 mr-2" /> Save
                 </EFButton>
                 <EFButton variant="ghost" size="icon"><Eye className="w-4 h-4" /></EFButton>
             </div>
         </div>

         <AddInteractionWizard 
            open={showWizard} 
            onOpenChange={setShowWizard} 
            onComplete={handleWizardComplete} 
         />
      </div>
  );
};

const EventDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto space-y-0 animate-in fade-in duration-500 pb-10 relative">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 -mx-8 px-8 py-3 mb-6 shadow-sm">
            <div className="flex justify-between items-center max-w-[1600px] mx-auto">
                {/* Left: Breadcrumbs */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Events</span>
                        <span className="text-slate-300">/</span>
                        <span className="font-semibold text-slate-900">Advanced Java Architecture 2025</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 flex gap-2">
                        <span>Lecture</span>
                        <span>•</span>
                        <span>Week 7</span>
                    </div>
                </div>

                {/* Middle: Health Strip */}
                <div className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100 shadow-inner">
                    <div className="px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                         <div className="w-2 h-2 rounded-full bg-green-500" />
                         <span className="text-xs font-bold text-slate-700">Ready</span>
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="px-3 py-1 rounded-full hover:bg-white/50 cursor-pointer transition-colors">
                         <span className="text-xs font-medium text-slate-600"><strong>214</strong> registered</span>
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="px-3 py-1 rounded-full hover:bg-white/50 cursor-pointer transition-colors">
                         <span className="text-xs font-medium text-slate-600"><strong>84%</strong> participation</span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <EFButton variant="ghost" size="sm" className="text-slate-500">Preview participant view</EFButton>
                    <EFButton variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-3.5 h-3.5" /> Share
                    </EFButton>
                    <EFButton size="sm" className="bg-primary hover:bg-blue-700 text-white gap-2 shadow-md shadow-blue-200" onClick={() => navigate('/host/live')}>
                        Go Live <ArrowRight className="w-3.5 h-3.5" />
                    </EFButton>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="timeline" className="space-y-6">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl shadow-sm w-full justify-start h-auto overflow-x-auto">
                {['Overview', 'Timeline & Interactions', 'Participants', 'Advanced Settings'].map(tab => (
                    <TabsTrigger 
                        key={tab} 
                        value={tab.split(' ')[0].toLowerCase()}
                        className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap"
                    >
                        {tab}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="overview">
                <OverviewTab />
            </TabsContent>
            <TabsContent value="timeline">
                <TimelineTab />
            </TabsContent>
        </Tabs>
    </div>
  );
};

export default EventDetail;
