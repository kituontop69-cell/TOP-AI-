import React, { useState, useEffect } from 'react';
import type { AITool, PricingType, ReportItem } from '../types';
import { toolStorage } from '../services/toolStorage';
import { analytics } from '../services/analytics';
import { CATEGORIES } from '../data/categories';
import { getPricingConfig } from '../utils/pricing';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Star, 
  ExternalLink, 
  Download, 
  Upload, 
  RefreshCw, 
  LogOut,
  Search,
  Check,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Data
  const [tools, setTools] = useState<AITool[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [activeAdminTab, setActiveAdminTab] = useState<'tools' | 'reports' | 'analytics' | 'backup'>('tools');
  const [searchFilter, setSearchFilter] = useState('');

  // Tool Form Modal
  const [isEditing, setIsEditing] = useState(false);
  const [editingTool, setEditingTool] = useState<Partial<AITool> | null>(null);
  const [formError, setFormError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const defaultPasskey = import.meta.env.VITE_ADMIN_PASSKEY || 'KITUONTOP69';

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('aivault_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setTools(toolStorage.getAllTools());
    setReports(toolStorage.getReports());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput.trim().toUpperCase() === defaultPasskey.toUpperCase()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('aivault_admin_auth', 'true');
      setAuthError('');
      loadData();
    } else {
      setAuthError('AUTHENTICATION FAILED: INVALID PASSKEY');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('aivault_admin_auth');
    setPasskeyInput('');
  };

  // Actions
  const handleOpenAdd = () => {
    setEditingTool({
      id: '',
      name: '',
      slug: '',
      description: '',
      longDescription: '',
      url: 'https://',
      category: ['ai-chat'],
      tags: [],
      pricingType: 'free-tier',
      pricingDetails: '',
      requiresLogin: false,
      mobileFriendly: true,
      rating: 4.8,
      popularity: 85,
      featured: false,
      trending: false,
      verified: true,
      keyFeatures: [],
      developerOrCompany: ''
    });
    setTagInput('');
    setFeatureInput('');
    setFormError('');
    setIsEditing(true);
  };

  const handleOpenEdit = (tool: AITool) => {
    setEditingTool({ ...tool });
    setTagInput(tool.tags.join(', '));
    setFeatureInput((tool.keyFeatures || []).join('\n'));
    setFormError('');
    setIsEditing(true);
  };

  const handleDeleteTool = async (id: string, name: string) => {
    if (window.confirm(`CONFIRM REMOVAL: Delete "${name}" from archive?`)) {
      await toolStorage.deleteTool(id);
      loadData();
    }
  };

  const handleToggleStatus = async (tool: AITool, field: 'verified' | 'featured' | 'trending') => {
    const updated = { ...tool, [field]: !tool[field] };
    await toolStorage.saveTool(updated);
    loadData();
  };

  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool) return;

    if (!editingTool.name?.trim()) {
      setFormError('Tool name is required.');
      return;
    }

    if (!editingTool.url || !editingTool.url.startsWith('https://')) {
      setFormError('URL must start with https://');
      return;
    }

    try {
      new URL(editingTool.url);
    } catch {
      setFormError('Valid URL required.');
      return;
    }

    if (!editingTool.description || editingTool.description.trim().length < 10) {
      setFormError('Description must be at least 10 characters.');
      return;
    }

    const slug = editingTool.slug || editingTool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = editingTool.id || slug;

    const tags = tagInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    const keyFeatures = featureInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const fullTool: AITool = {
      id,
      name: editingTool.name.trim(),
      slug,
      description: editingTool.description.trim(),
      longDescription: editingTool.longDescription?.trim() || undefined,
      url: editingTool.url.trim(),
      logo: editingTool.logo?.trim() || undefined,
      category: editingTool.category || ['ai-chat'],
      tags: tags.length ? tags : ['ai'],
      pricingType: editingTool.pricingType || 'free-tier',
      pricingDetails: editingTool.pricingDetails?.trim() || undefined,
      requiresLogin: Boolean(editingTool.requiresLogin),
      mobileFriendly: editingTool.mobileFriendly !== false,
      rating: editingTool.rating || 4.8,
      popularity: editingTool.popularity || 85,
      featured: Boolean(editingTool.featured),
      trending: Boolean(editingTool.trending),
      verified: Boolean(editingTool.verified),
      dateAdded: editingTool.dateAdded || new Date().toISOString().split('T')[0],
      lastChecked: new Date().toISOString().split('T')[0],
      keyFeatures,
      developerOrCompany: editingTool.developerOrCompany?.trim() || undefined
    };

    await toolStorage.saveTool(fullTool);
    setIsEditing(false);
    setEditingTool(null);
    loadData();
  };

  const handleResolveReport = (id: string, status: 'resolved' | 'dismissed') => {
    toolStorage.updateReportStatus(id, status);
    loadData();
  };

  const handleDeleteReport = (id: string) => {
    toolStorage.deleteReport(id);
    loadData();
  };

  const handleDownloadBackup = () => {
    const jsonStr = toolStorage.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-vault-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = toolStorage.importBackup(content);
      if (res.success) {
        alert(`SUCCESS: Imported ${res.count} tools.`);
        loadData();
      } else {
        alert(`IMPORT FAILED: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  const handleResetCatalog = () => {
    if (window.confirm('RESET CATALOG: Replace catalog with default starter tools?')) {
      toolStorage.resetToDefault();
      loadData();
    }
  };

  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.category.some(c => c.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;
  const verifiedCount = tools.filter(t => t.verified).length;
  const totalClicks = tools.reduce((acc, t) => acc + (t.clicks || 0), 0);

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FF4D00] text-black min-h-screen pt-32 pb-20 flex items-center justify-center p-4 select-none">
        <div className="relative w-full max-w-md bg-[#000000] text-white border-2 border-black p-8 shadow-[10px_10px_0px_#000000]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-[#FF4D00] text-black border-2 border-white flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
              ADMIN GATEWAY
            </h2>
            <p className="font-mono text-xs text-[#FF4D00] uppercase mt-1">
              AUTHORIZED PERSONNEL ONLY // PASSKEY REQUIRED
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-mono text-xs font-bold uppercase text-white block mb-1">
                // ENTER PASSKEY
              </label>
              <input
                type="password"
                required
                value={passkeyInput}
                onChange={e => setPasskeyInput(e.target.value)}
                placeholder="PASSKEY..."
                className="w-full bg-[#000000] text-white border-2 border-white focus:border-[#FF4D00] px-4 py-3 font-mono text-sm focus:outline-none uppercase"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-950 text-red-300 border-2 border-red-500 font-mono text-xs font-bold uppercase">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#FF4D00] text-black font-display text-base uppercase tracking-tight border-2 border-black hover:bg-white transition-all shadow-[4px_4px_0px_#FFFFFF]"
            >
              AUTHENTICATE SESSION
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-2.5 font-mono text-xs text-white/70 hover:text-white uppercase text-center block transition-colors"
            >
              [ RETURN TO PUBLIC HUB ]
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FF4D00] text-black min-h-screen pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b-2 border-black">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black block mb-1">
              // ARCHIVE GOVERNANCE // SYSTEM CONTROL
            </span>
            <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-black">
              ADMIN CONTROL CENTER
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 shadow-[4px_4px_0px_#000000]"
            >
              <Plus className="w-4 h-4" />
              <span>ADD TOOL</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-full bg-white text-black hover:bg-black hover:text-white border-2 border-black font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>EXIT</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-black text-white border-2 border-black p-5 shadow-[6px_6px_0px_#000000]">
            <span className="font-mono text-xs text-[#FF4D00] uppercase block mb-1">TOTAL CATALOG TOOLS</span>
            <div className="font-display text-4xl">{tools.length}</div>
          </div>

          <div className="bg-black text-white border-2 border-black p-5 shadow-[6px_6px_0px_#000000]">
            <span className="font-mono text-xs text-[#FF4D00] uppercase block mb-1">VERIFIED ACCURATE</span>
            <div className="font-display text-4xl">{verifiedCount}</div>
          </div>

          <div className="bg-black text-white border-2 border-black p-5 shadow-[6px_6px_0px_#000000]">
            <span className="font-mono text-xs text-[#FF4D00] uppercase block mb-1">OUTBOUND LAUNCHES</span>
            <div className="font-display text-4xl">{totalClicks}</div>
          </div>

          <div className="bg-black text-white border-2 border-black p-5 shadow-[6px_6px_0px_#000000]">
            <span className="font-mono text-xs text-[#FF4D00] uppercase block mb-1">PENDING REPORTS</span>
            <div className={`font-display text-4xl ${pendingReportsCount > 0 ? 'text-[#FF4D00]' : 'text-white'}`}>
              {pendingReportsCount}
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b-2 border-black pb-3 overflow-x-auto no-scrollbar font-mono text-xs font-bold uppercase">
          <button
            onClick={() => setActiveAdminTab('tools')}
            className={`px-4 py-2 rounded-full border-2 border-black transition-all ${
              activeAdminTab === 'tools'
                ? 'bg-black text-white shadow-[3px_3px_0px_#000000]'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            TOOLS DIRECTORY ({tools.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('reports')}
            className={`px-4 py-2 rounded-full border-2 border-black transition-all flex items-center gap-1.5 ${
              activeAdminTab === 'reports'
                ? 'bg-black text-white shadow-[3px_3px_0px_#000000]'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span>REPORTS QUEUE</span>
            {pendingReportsCount > 0 && (
              <span className="bg-[#FF4D00] text-black px-1.5 py-0.2 rounded-full text-[10px]">
                {pendingReportsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-4 py-2 rounded-full border-2 border-black transition-all ${
              activeAdminTab === 'analytics'
                ? 'bg-black text-white shadow-[3px_3px_0px_#000000]'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            TELEMETRY
          </button>

          <button
            onClick={() => setActiveAdminTab('backup')}
            className={`px-4 py-2 rounded-full border-2 border-black transition-all ${
              activeAdminTab === 'backup'
                ? 'bg-black text-white shadow-[3px_3px_0px_#000000]'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            DATA BACKUP
          </button>
        </div>

        {/* --- TAB 1: TOOLS DIRECTORY --- */}
        {activeAdminTab === 'tools' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="FILTER ENTRIES..."
                  className="w-full bg-white text-black border-2 border-black px-4 py-2 font-mono text-xs font-bold uppercase placeholder-black/40 focus:outline-none"
                />
              </div>
              <div className="font-mono text-xs font-bold uppercase">
                [{filteredTools.length} OF {tools.length} DISPLAYED]
              </div>
            </div>

            <div className="overflow-x-auto bg-black text-white border-2 border-black shadow-[8px_8px_0px_#000000]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black text-[#FF4D00] uppercase text-[11px] border-b-2 border-white/20">
                  <tr>
                    <th className="py-3 px-4">TOOL SPEC</th>
                    <th className="py-3 px-4">PRICING</th>
                    <th className="py-3 px-4">DOMAINS</th>
                    <th className="py-3 px-4 text-center">FLAGS</th>
                    <th className="py-3 px-4 text-center">LAUNCHES</th>
                    <th className="py-3 px-4 text-right">MANAGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredTools.map(tool => {
                    const pricing = getPricingConfig(tool.pricingType);
                    return (
                      <tr key={tool.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-display text-sm uppercase text-white">
                            {tool.name}
                          </div>
                          <span className="text-white/60 text-[11px] block truncate max-w-xs">
                            {tool.url}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${pricing.badgeBg} ${pricing.badgeText} ${pricing.badgeBorder}`}>
                            {pricing.shortLabel}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-white/70">
                          {tool.category.slice(0, 2).join(', ')}
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(tool, 'verified')}
                              className={`p-1 border text-[10px] font-bold ${
                                tool.verified ? 'bg-[#FF4D00] text-black border-[#FF4D00]' : 'border-white/30 text-white/30'
                              }`}
                              title="Toggle Verified"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(tool, 'trending')}
                              className={`p-1 border text-[10px] font-bold ${
                                tool.trending ? 'bg-white text-black border-white' : 'border-white/30 text-white/30'
                              }`}
                              title="Toggle Trending"
                            >
                              <Flame className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-center font-bold text-[#FF4D00]">
                          {tool.clicks || 0}
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(tool)}
                              className="p-1.5 bg-white text-black hover:bg-[#FF4D00] transition-colors"
                              title="Edit Tool"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTool(tool.id, tool.name)}
                              className="p-1.5 bg-red-600 text-white hover:bg-black transition-colors"
                              title="Delete Tool"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 2: REPORTS QUEUE --- */}
        {activeAdminTab === 'reports' && (
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="text-center py-16 bg-black text-white border-2 border-black p-8">
                <Check className="w-8 h-8 text-[#FF4D00] mx-auto mb-2" />
                <p className="font-display text-lg uppercase tracking-tight">ALL SYSTEMS VERIFIED</p>
                <p className="font-mono text-xs text-white/70">No pending inaccuracy reports.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map(report => (
                  <div
                    key={report.id}
                    className="p-6 bg-black text-white border-2 border-black shadow-[6px_6px_0px_#000000]"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3 border-b border-white/20 pb-3">
                      <div>
                        <span className="font-display text-lg uppercase text-white mr-3">
                          {report.toolName}
                        </span>
                        <span className="font-mono text-[11px] text-[#FF4D00] uppercase font-bold">
                          [{report.reason.replace('_', ' ')}]
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {report.status === 'pending' && (
                          <button
                            onClick={() => handleResolveReport(report.id, 'resolved')}
                            className="px-3 py-1 bg-[#FF4D00] text-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors"
                          >
                            RESOLVE
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-1 text-white/50 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="font-mono text-xs text-white/90 bg-white/5 p-3 border border-white/10 uppercase">
                      {report.details}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: TELEMETRY --- */}
        {activeAdminTab === 'analytics' && (
          <div className="bg-black text-white border-2 border-black p-6 space-y-6 shadow-[8px_8px_0px_#000000]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(analytics.getEventSummary()).map(([evt, count]) => (
                <div key={evt} className="p-4 bg-white/5 border border-white/20">
                  <span className="font-mono text-[10px] text-[#FF4D00] uppercase block mb-1">
                    {evt.replace('_', ' ')}
                  </span>
                  <div className="font-display text-3xl">{count}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: BACKUP & RESTORE --- */}
        {activeAdminTab === 'backup' && (
          <div className="bg-black text-white border-2 border-black p-8 space-y-8 max-w-2xl shadow-[8px_8px_0px_#000000]">
            <div>
              <h3 className="font-display text-xl uppercase tracking-tight text-white mb-2">
                EXPORT SYSTEM CATALOG
              </h3>
              <p className="font-mono text-xs text-white/70 mb-4 uppercase">
                Download structured JSON backup of all tools and audit telemetry.
              </p>
              <button
                onClick={handleDownloadBackup}
                className="px-6 py-3 bg-[#FF4D00] text-black font-display text-xs uppercase tracking-tight hover:bg-white transition-all shadow-[4px_4px_0px_#FFFFFF] flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD ARCHIVE (.JSON)</span>
              </button>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="font-display text-xl uppercase tracking-tight text-white mb-2">
                RESTORE / IMPORT ARCHIVE
              </h3>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-display text-xs uppercase tracking-tight hover:bg-[#FF4D00] transition-all cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>SELECT BACKUP FILE (.JSON)</span>
                <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
              </label>
            </div>

            <div className="border-t border-white/20 pt-6">
              <button
                onClick={handleResetCatalog}
                className="px-4 py-2 border-2 border-red-500 text-red-400 font-mono text-xs font-bold uppercase hover:bg-red-500 hover:text-black transition-colors"
              >
                RESET CATALOG TO FACTORY SEED DATA
              </button>
            </div>
          </div>
        )}

        {/* Modal: Add/Edit Tool */}
        {isEditing && editingTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div 
              onClick={() => setIsEditing(false)} 
              className="fixed inset-0 bg-black/85 backdrop-blur-sm" 
            />

            <div className="relative w-full max-w-2xl bg-[#000000] text-white border-2 border-white shadow-[10px_10px_0px_#FF4D00] p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto font-mono select-none">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 p-2 bg-white text-black hover:bg-[#FF4D00]"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="font-display text-2xl uppercase tracking-tight text-white mb-6">
                {editingTool.id ? 'EDIT LISTING SPEC' : 'CREATE NEW LISTING'}
              </h2>

              {formError && (
                <div className="p-3 mb-4 bg-red-950 text-red-300 border border-red-500 text-xs uppercase font-bold">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSaveTool} className="space-y-4 text-xs">
                <div>
                  <label className="text-white font-bold block mb-1 uppercase">TOOL NAME *</label>
                  <input
                    type="text"
                    required
                    value={editingTool.name || ''}
                    onChange={e => setEditingTool({ ...editingTool, name: e.target.value })}
                    placeholder="TOOL NAME..."
                    className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 text-white uppercase focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-bold block mb-1 uppercase">OFFICIAL DESTINATION URL (HTTPS) *</label>
                  <input
                    type="url"
                    required
                    value={editingTool.url || ''}
                    onChange={e => setEditingTool({ ...editingTool, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-bold block mb-1 uppercase">SHORT CAPABILITIES SUMMARY *</label>
                  <textarea
                    required
                    rows={2}
                    value={editingTool.description || ''}
                    onChange={e => setEditingTool({ ...editingTool, description: e.target.value })}
                    placeholder="EXACT FUNCTION..."
                    className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] p-2 text-white uppercase focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-white font-bold block mb-1 uppercase">PRICING CATEGORY</label>
                    <select
                      value={editingTool.pricingType || 'free-tier'}
                      onChange={e => setEditingTool({ ...editingTool, pricingType: e.target.value as PricingType })}
                      className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 text-white uppercase focus:outline-none"
                    >
                      <option value="free">FREE FOREVER</option>
                      <option value="free-tier">FREE TIER</option>
                      <option value="free-credits">FREE CREDITS</option>
                      <option value="open-source">OPEN SOURCE</option>
                      <option value="limited-free">LIMITED FREE</option>
                      <option value="paid">PAID ONLY</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white font-bold block mb-1 uppercase">PRICING DETAIL STAMP</label>
                    <input
                      type="text"
                      value={editingTool.pricingDetails || ''}
                      onChange={e => setEditingTool({ ...editingTool, pricingDetails: e.target.value })}
                      placeholder="E.G. 50 CREDITS DAILY..."
                      className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 text-white uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white font-bold block mb-1 uppercase">TAGS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    placeholder="CODING, AGENTS, VIDEO..."
                    className="w-full bg-[#000000] border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 text-white uppercase focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/20">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 bg-transparent border-2 border-white text-white uppercase hover:bg-white hover:text-black font-bold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FF4D00] text-black border-2 border-black font-display uppercase tracking-tight hover:bg-white font-black"
                  >
                    COMMIT TO ARCHIVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
