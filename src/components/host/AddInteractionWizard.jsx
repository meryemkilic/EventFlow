import React, { useState } from 'react';
import { 
  Check, X, ArrowRight, ChevronRight, ChevronLeft, 
  Flame, MessageCircle, Zap, BarChart, HelpCircle, Clock, CheckCircle,
  List, Type, LayoutList, Trophy, Timer, Sparkles, LayoutGrid
} from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { EFCard, EFCardContent } from "@/components/ui/ef-card";
import { EFBadge } from "@/components/ui/ef-badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

// --- Wizard Data ---

const GOALS = [
  { id: 'check', label: 'Check understanding', icon: Flame, desc: 'Test knowledge with score', type: 'Quiz' },
  { id: 'opinion', label: 'Collect opinions', icon: MessageCircle, desc: 'No right answer polls', type: 'Poll' },
  { id: 'warmup', label: 'Warm-up / Icebreaker', icon: Zap, desc: 'Fun, low stakes', type: 'Word Cloud' },
  { id: 'word', label: 'One-word impressions', icon: Sparkles, desc: 'Word cloud visualization', type: 'Word Cloud' },
  { id: 'measure', label: 'Measure confidence', icon: BarChart, desc: 'Rating scales', type: 'Poll' },
  { id: 'ask', label: 'Let them ask', icon: HelpCircle, desc: 'Q&A session', type: 'Q&A' },
];

const ANSWER_FORMATS = [
  { id: 'single', label: 'Choose one option', icon: List },
  { id: 'multi', label: 'Choose multiple options', icon: LayoutList },
  { id: 'text', label: 'Type short answer', icon: Type },
  { id: 'scale', label: 'Rate on a scale', icon: BarChart },
];

const AddInteractionWizard = ({ open, onOpenChange, onComplete }) => {
  const [mode, setMode] = useState('guided'); // guided, gallery
  const [step, setStep] = useState(1);
  
  // Wizard State
  const [selections, setSelections] = useState({
    goal: null,
    format: null,
    scoring: 'none', // none, xp, score_xp
    time: '30s'
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    const suggestedType = GOALS.find(g => g.id === selections.goal)?.type || 'Poll';
    onComplete({
        type: suggestedType,
        title: 'New Interaction',
        meta: [suggestedType, selections.time, selections.scoring !== 'none' ? 'Gamified' : 'Ungraded']
    });
    toast.success(`Created new ${suggestedType}!`);
    onOpenChange(false);
    // Reset
    setTimeout(() => {
        setStep(1);
        setSelections({ goal: null, format: null, scoring: 'none', time: '30s' });
    }, 500);
  };

  // --- Render Steps ---

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-2xl font-display font-bold text-slate-900">What is the goal?</h3>
        <p className="text-muted-foreground">Choose what you want to achieve with this interaction.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {GOALS.map((goal) => (
          <div 
            key={goal.id}
            onClick={() => setSelections({...selections, goal: goal.id})}
            className={cn(
              "cursor-pointer p-4 rounded-xl border-2 transition-all hover:bg-slate-50 relative overflow-hidden",
              selections.goal === goal.id 
                ? "border-primary bg-primary/5 shadow-sm" 
                : "border-slate-100 bg-white"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                selections.goal === goal.id ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
              )}>
                <goal.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{goal.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{goal.desc}</div>
              </div>
            </div>
            {selections.goal === goal.id && (
               <div className="absolute top-3 right-3 text-primary"><CheckCircle className="w-5 h-5" /></div>
            )}
          </div>
        ))}
      </div>
      {selections.goal && (
         <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4" />
            <span>Great! This sounds like a <strong>{GOALS.find(g => g.id === selections.goal)?.type}</strong>.</span>
         </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-2xl font-display font-bold text-slate-900">How should they respond?</h3>
        <p className="text-muted-foreground">Select the input format for participants.</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
         {ANSWER_FORMATS.map((fmt) => (
            <div 
                key={fmt.id}
                onClick={() => setSelections({...selections, format: fmt.id})}
                className={cn(
                "cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                selections.format === fmt.id
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-slate-100 bg-white hover:bg-slate-50"
                )}
            >
                <div className={cn("p-2 rounded-md", selections.format === fmt.id ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}>
                    <fmt.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-900">{fmt.label}</span>
            </div>
         ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
     <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-slate-900">Scoring & Time</h3>
            <p className="text-muted-foreground">Define the rules of engagement.</p>
        </div>

        <div className="space-y-4">
            <Label className="text-base">Scoring Mode</Label>
            <div className="grid grid-cols-3 gap-3">
                {['none', 'xp', 'score_xp'].map((mode) => (
                    <div 
                        key={mode}
                        onClick={() => setSelections({...selections, scoring: mode})}
                        className={cn(
                            "cursor-pointer p-3 rounded-lg border-2 text-center transition-all",
                            selections.scoring === mode
                                ? "border-primary bg-primary/5 text-primary font-bold" 
                                : "border-slate-100 bg-white text-slate-600"
                        )}
                    >
                        {mode === 'none' && 'Just Feedback'}
                        {mode === 'xp' && 'XP Only'}
                        {mode === 'score_xp' && 'Score + XP'}
                    </div>
                ))}
            </div>
            {selections.scoring !== 'none' && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Switch id="elimination" /> <Label htmlFor="elimination">Elimination Mode (Hardcore)</Label>
                </div>
            )}
        </div>

        <div className="space-y-4">
            <Label className="text-base">Duration Estimate</Label>
            <div className="flex gap-3">
                 {['15s', '30s', '45s', '1m', '2m+'].map((t) => (
                    <button 
                        key={t}
                        onClick={() => setSelections({...selections, time: t})}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                             selections.time === t
                                ? "bg-slate-900 text-white border-slate-900" 
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                        )}
                    >
                        {t}
                    </button>
                 ))}
            </div>
        </div>
     </div>
  );

  const renderStep4 = () => {
    const suggested = GOALS.find(g => g.id === selections.goal) || GOALS[0];
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-slate-900">Ready to create?</h3>
                <p className="text-muted-foreground">Based on your choices, here is the best fit.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <suggested.icon className="w-32 h-32 text-primary" />
                 </div>
                 
                 <div className="relative z-10 space-y-4">
                     <div className="flex items-center gap-3">
                         <EFBadge className="text-base px-3 py-1 bg-primary text-white border-none">{suggested.type}</EFBadge>
                         <span className="text-blue-800 font-medium">Recommended</span>
                     </div>
                     
                     <div className="space-y-2">
                         <h4 className="text-xl font-bold text-slate-900">Perfect for {suggested.label.toLowerCase()}</h4>
                         <p className="text-slate-600 text-sm max-w-sm">
                            This interaction type allows participants to {selections.format === 'multi' ? 'select multiple options' : 'choose an answer'} 
                            {' '}within {selections.time}.
                         </p>
                     </div>

                     <div className="flex flex-wrap gap-2 pt-2">
                        <EFBadge variant="outline" className="bg-white/50 text-slate-700">
                           <Timer className="w-3 h-3 mr-1" /> {selections.time}
                        </EFBadge>
                        <EFBadge variant="outline" className="bg-white/50 text-slate-700">
                           <Trophy className="w-3 h-3 mr-1" /> {selections.scoring === 'none' ? 'No scoring' : 'Gamified'}
                        </EFBadge>
                     </div>
                 </div>
            </div>

            <div className="flex gap-4 pt-4">
                <EFButton size="lg" className="flex-1 bg-primary hover:bg-blue-700 text-white shadow-lg shadow-blue-200" onClick={handleFinish}>
                    Create {suggested.type}
                </EFButton>
                <EFButton size="lg" variant="outline" className="flex-1" onClick={() => setMode('gallery')}>
                    See other options
                </EFButton>
            </div>
        </div>
    );
  };

  // --- Preview Component ---
  const Preview = () => (
      <div className="bg-[#05070B] rounded-3xl border-4 border-slate-800 h-[500px] w-[280px] mx-auto relative overflow-hidden shadow-2xl flex flex-col">
          <div className="h-6 bg-slate-800 w-1/2 mx-auto rounded-b-xl mb-4" />
          
          <div className="px-4 flex-1 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <div className="text-white text-xs font-mono">{selections.time} remaining</div>
              </div>

              {/* Question */}
              <div className="space-y-4 mb-6">
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
              </div>

              {/* Options */}
              <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-10 rounded-lg border border-white/10 bg-white/5 flex items-center px-3">
                           <div className="w-4 h-4 rounded-full border border-white/20" />
                           <div className="ml-3 h-2 bg-white/10 rounded w-1/2" />
                      </div>
                  ))}
              </div>

              <div className="mt-auto mb-6">
                   <div className="h-10 bg-primary rounded-lg w-full flex items-center justify-center text-white font-bold text-sm opacity-50">
                        Submit
                   </div>
              </div>
          </div>
      </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden bg-white h-[600px] flex rounded-2xl border-none shadow-2xl">
            {/* Left Panel: Wizard */}
            <div className="w-2/3 p-8 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-4">
                         <button 
                            onClick={() => setMode('guided')}
                            className={cn("text-sm font-bold border-b-2 pb-1 transition-colors", mode === 'guided' ? "text-primary border-primary" : "text-muted-foreground border-transparent")}
                         >
                            Guided Builder
                         </button>
                         <button 
                            onClick={() => setMode('gallery')}
                            className={cn("text-sm font-bold border-b-2 pb-1 transition-colors", mode === 'gallery' ? "text-primary border-primary" : "text-muted-foreground border-transparent")}
                         >
                            Gallery
                         </button>
                    </div>
                    <div className="text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded">
                        Step {step} / 4
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-1">
                    {mode === 'guided' ? (
                        <>
                            {step === 1 && renderStep1()}
                            {step === 2 && renderStep2()}
                            {step === 3 && renderStep3()}
                            {step === 4 && renderStep4()}
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                            {GOALS.map(g => (
                                <div key={g.id} onClick={handleFinish} className="p-4 border rounded-xl hover:border-primary hover:shadow-md cursor-pointer transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                                        <g.icon className="w-5 h-5 text-primary" />
                                        <span className="font-bold text-slate-900">{g.type}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{g.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {mode === 'guided' && (
                    <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <EFButton 
                            variant="ghost" 
                            onClick={handleBack} 
                            disabled={step === 1}
                            className="text-slate-500"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </EFButton>

                        {step < 4 ? (
                             <EFButton onClick={handleNext} disabled={!selections.goal} className="bg-primary text-white hover:bg-blue-700">
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                             </EFButton>
                        ) : null}
                    </div>
                )}
            </div>

            {/* Right Panel: Preview */}
            <div className="w-1/3 bg-slate-50 border-l border-slate-200 p-8 flex flex-col items-center justify-center relative">
                <div className="absolute top-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">Participant Preview</div>
                <Preview />
            </div>
        </DialogContent>
    </Dialog>
  );
};

export default AddInteractionWizard;
