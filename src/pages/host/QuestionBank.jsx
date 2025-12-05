import React, { useState } from 'react';
import { 
  Search, Plus, Filter, LayoutGrid, LayoutList, MoreHorizontal, 
  Play, Calendar, Edit2, Copy, Archive, Tag
} from 'lucide-react';
import { EFButton } from "@/components/ui/ef-button";
import { EFCard, EFCardContent } from "@/components/ui/ef-card";
import { EFBadge } from "@/components/ui/ef-badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

const QUESTIONS_DATA = [
    { id: 1, type: 'Quiz', q: "What is the complexity of QuickSort?", tags: ['Algo', 'CS101'], used: 'Java 2025', count: 12, color: 'text-purple-600 bg-purple-50' },
    { id: 2, type: 'Poll', q: "Preferred IDE for Python?", tags: ['Tools', 'DevEnv'], used: 'Python Workshop', count: 8, color: 'text-blue-600 bg-blue-50' },
    { id: 3, type: 'Word', q: "One word for 2024 tech scene", tags: ['General', 'Icebreaker'], used: 'Q1 All Hands', count: 45, color: 'text-teal-600 bg-teal-50' },
    { id: 4, type: 'Quiz', q: "Identify the Singleton pattern", tags: ['Design Patterns'], used: '-', count: 0, color: 'text-purple-600 bg-purple-50' },
    { id: 5, type: 'Poll', q: "Remote vs Office preference", tags: ['HR', 'Culture'], used: 'Townhall', count: 156, color: 'text-blue-600 bg-blue-50' },
    { id: 6, type: 'Quiz', q: "What is a goroutine?", tags: ['Go', 'Concurrency'], used: '-', count: 2, color: 'text-purple-600 bg-purple-50' },
];

const QuestionBank = () => {
  const [viewMode, setViewMode] = useState('table');
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  const filteredQuestions = QUESTIONS_DATA.filter(q => {
      const matchesType = filterType === 'All' || q.type === filterType || (filterType === 'Word Cloud' && q.type === 'Word');
      const matchesSearch = q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
        {/* Header */}
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900">Question Bank</h1>
                <p className="text-muted-foreground mt-1">Reuse and organize questions across all your events.</p>
            </div>
            <div className="flex gap-3">
                <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                     <Input 
                        className="pl-9 w-80 bg-white border-slate-200" 
                        placeholder="Search questions, tags, or topics..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                </div>
                <EFButton className="bg-primary hover:bg-blue-700 text-white shadow-md shadow-blue-200" onClick={() => toast.success("New Question Dialog opened")}>
                    <Plus className="w-4 h-4 mr-2" /> New Question
                </EFButton>
            </div>
        </div>

        {/* Filter Bar */}
        <EFCard className="bg-white border-slate-200 shadow-sm">
            <EFCardContent className="p-4 flex items-center justify-between gap-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <span className="text-sm font-medium text-slate-900 mr-2">Type:</span>
                    {['All', 'Poll', 'Quiz', 'Word Cloud', 'Open Text', 'Ranking'].map((f, i) => (
                        <button 
                            key={f} 
                            onClick={() => setFilterType(f)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                                filterType === f 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
                    <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger className="w-[140px] h-9 bg-slate-50 border-slate-200"><SelectValue placeholder="Difficulty" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Difficulty</SelectItem>
                            <SelectItem value="intro">Intro</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="h-9 bg-slate-100 p-1 rounded-lg flex gap-1">
                        <button 
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutList className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('card')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </EFCardContent>
        </EFCard>

        {/* Content */}
        {viewMode === 'table' ? (
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-slate-500">Type</th>
                            <th className="px-6 py-4 font-medium text-slate-500 w-1/3">Question</th>
                            <th className="px-6 py-4 font-medium text-slate-500">Tags</th>
                            <th className="px-6 py-4 font-medium text-slate-500">Used In</th>
                            <th className="px-6 py-4 font-medium text-slate-500">Stats</th>
                            <th className="px-6 py-4 font-medium text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredQuestions.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${row.color}`}>
                                        {row.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">{row.q}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1 flex-wrap">
                                        {row.tags.map(t => (
                                            <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs border border-slate-200">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{row.used}</td>
                                <td className="px-6 py-4 text-slate-500">{row.count} times</td>
                                <td className="px-6 py-4 text-right">
                                    <EFButton variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </EFButton>
                                </td>
                            </tr>
                        ))}
                        {filteredQuestions.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                    No questions found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredQuestions.map((row) => (
                    <EFCard key={row.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <EFCardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                 <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${row.color}`}>
                                    {row.type}
                                </span>
                                <EFButton variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="w-4 h-4" /></EFButton>
                            </div>
                            <h3 className="font-medium text-slate-900 text-lg leading-snug line-clamp-2">{row.q}</h3>
                             <div className="flex gap-1 flex-wrap">
                                {row.tags.map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs border border-slate-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                             <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-muted-foreground">
                                <span>Used {row.count} times</span>
                                <span>{row.used}</span>
                            </div>
                        </EFCardContent>
                    </EFCard>
                ))}
            </div>
        )}
    </div>
  );
};

export default QuestionBank;
