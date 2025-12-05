import React from 'react';
import { 
  Globe, Shield, Trophy, Palette, Box, User, Bell, Lock, Save
} from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { EFCard, EFCardContent, EFCardHeader, EFCardTitle } from "@/components/ui/ef-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState('general');

  const navItems = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Access & Security', icon: Shield },
    { id: 'gamification', label: 'Gamification', icon: Trophy },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Box },
    { id: 'profile', label: 'Host Profile', icon: User },
  ];

  const handleSave = () => {
      toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto flex gap-8 animate-in fade-in duration-500 pb-10">
        {/* Inner Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-2">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left ${
                        activeTab === item.id 
                            ? 'bg-primary text-white shadow-md shadow-blue-200' 
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
             {activeTab === 'general' && (
                 <>
                    <EFCard className="bg-white border-slate-200 shadow-sm">
                        <EFCardHeader>
                            <EFCardTitle className="text-slate-900">Organization Details</EFCardTitle>
                        </EFCardHeader>
                        <EFCardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Organization Name</Label>
                                    <Input defaultValue="Tech Corp Inc." className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Default Language</Label>
                                    <Select defaultValue="en"><SelectTrigger className="bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem></SelectContent></Select>
                                </div>
                            </div>
                        </EFCardContent>
                    </EFCard>

                    <EFCard className="bg-white border-slate-200 shadow-sm">
                        <EFCardHeader>
                            <EFCardTitle className="text-slate-900">Event Defaults</EFCardTitle>
                        </EFCardHeader>
                        <EFCardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Allow Anonymous</Label>
                                    <p className="text-xs text-muted-foreground">Participants can join without names</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Enable Q&A</Label>
                                    <p className="text-xs text-muted-foreground">Allow audience to ask questions</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </EFCardContent>
                    </EFCard>
                 </>
             )}

             {activeTab === 'security' && (
                 <EFCard className="bg-white border-slate-200 shadow-sm">
                    <EFCardHeader>
                        <EFCardTitle className="text-slate-900">Access Control</EFCardTitle>
                    </EFCardHeader>
                    <EFCardContent className="space-y-4">
                        <div className="space-y-3">
                            <Label>Join Rules</Label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input type="radio" name="access" defaultChecked className="accent-primary" />
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-900 text-sm">Anyone with code</div>
                                        <div className="text-xs text-muted-foreground">Public access via 6-digit code</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input type="radio" name="access" className="accent-primary" />
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-900 text-sm">Corporate Domain Only</div>
                                        <div className="text-xs text-muted-foreground">Restrict to specific email domains</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </EFCardContent>
                 </EFCard>
             )}
             
             {/* Other tabs placeholders */}
             {activeTab !== 'general' && activeTab !== 'security' && (
                 <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                     <p className="text-slate-400">Settings for {navItems.find(i => i.id === activeTab)?.label} coming soon</p>
                 </div>
             )}

             <div className="flex justify-end pt-4">
                 <EFButton className="bg-primary hover:bg-blue-700 text-white" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                 </EFButton>
             </div>
        </div>
    </div>
  );
};

export default SettingsPage;
