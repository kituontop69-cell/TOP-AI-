import { AITool, ReportItem } from '../types';
import { INITIAL_TOOLS } from '../data/seedTools';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const TOOLS_KEY = 'aivault_tools_v1';
const FAVORITES_KEY = 'aivault_favorites_v1';
const RECENT_KEY = 'aivault_recent_v1';
const REPORTS_KEY = 'aivault_reports_v1';

// Custom event for reactive UI updates across components
export const STORAGE_CHANGE_EVENT = 'aivault:storage_updated';
function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT));
  }
}

class ToolStorage {
  private memoryTools: AITool[] = [];

  constructor() {
    this.initTools();
  }

  private initTools(): void {
    if (typeof window === 'undefined') {
      this.memoryTools = [...INITIAL_TOOLS];
      return;
    }

    try {
      const stored = localStorage.getItem(TOOLS_KEY);
      if (stored) {
        const parsed: AITool[] = JSON.parse(stored);
        // Ensure all initial tools exist in storage and sync updated verified URLs
        const storedMap = new Map(parsed.map(t => [t.id, t]));
        for (const seed of INITIAL_TOOLS) {
          if (!storedMap.has(seed.id)) {
            storedMap.set(seed.id, seed);
          } else {
            const existing = storedMap.get(seed.id)!;
            if (existing.url !== seed.url) {
              existing.url = seed.url;
            }
          }
        }
        this.memoryTools = Array.from(storedMap.values());
        localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
      } else {
        this.memoryTools = [...INITIAL_TOOLS];
        localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
      }
    } catch {
      this.memoryTools = [...INITIAL_TOOLS];
    }
  }

  // --- TOOLS CRUD ---

  public getAllTools(): AITool[] {
    return [...this.memoryTools];
  }

  public getToolById(id: string): AITool | undefined {
    return this.memoryTools.find(t => t.id === id);
  }

  public getToolBySlug(slug: string): AITool | undefined {
    return this.memoryTools.find(t => t.slug === slug);
  }

  public async saveTool(tool: AITool): Promise<boolean> {
    const existingIndex = this.memoryTools.findIndex(t => t.id === tool.id);
    if (existingIndex >= 0) {
      this.memoryTools[existingIndex] = { ...tool, lastChecked: new Date().toISOString().split('T')[0] };
    } else {
      this.memoryTools.unshift({
        ...tool,
        dateAdded: tool.dateAdded || new Date().toISOString().split('T')[0],
        lastChecked: new Date().toISOString().split('T')[0],
        clicks: tool.clicks || 0,
        views: tool.views || 0,
        rating: tool.rating || 4.8,
        popularity: tool.popularity || 85
      });
    }

    try {
      localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
    } catch (e) {
      console.error('Storage error:', e);
    }

    // Remote sync if Supabase is connected
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('tools').upsert({
          id: tool.id,
          name: tool.name,
          slug: tool.slug,
          description: tool.description,
          long_description: tool.longDescription,
          url: tool.url,
          logo: tool.logo,
          category: tool.category,
          tags: tool.tags,
          pricing_type: tool.pricingType,
          pricing_details: tool.pricingDetails,
          requires_login: tool.requiresLogin,
          mobile_friendly: tool.mobileFriendly,
          rating: tool.rating,
          popularity: tool.popularity,
          featured: tool.featured,
          trending: tool.trending,
          verified: tool.verified
        });
      } catch (err) {
        console.warn('Supabase saveTool sync error:', err);
      }
    }

    notifyChange();
    return true;
  }

  public async deleteTool(id: string): Promise<boolean> {
    this.memoryTools = this.memoryTools.filter(t => t.id !== id);
    try {
      localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
    } catch (e) {
      console.error('Storage error:', e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('tools').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteTool error:', err);
      }
    }

    notifyChange();
    return true;
  }

  public recordClick(id: string): void {
    const tool = this.memoryTools.find(t => t.id === id);
    if (tool) {
      tool.clicks = (tool.clicks || 0) + 1;
      try {
        localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
      } catch {}
      this.addRecentlyUsed(id);
      notifyChange();
    }
  }

  public recordView(id: string): void {
    const tool = this.memoryTools.find(t => t.id === id);
    if (tool) {
      tool.views = (tool.views || 0) + 1;
      try {
        localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
      } catch {}
    }
  }

  // --- FAVORITES ---

  public getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public toggleFavorite(toolId: string): boolean {
    const current = this.getFavorites();
    const index = current.indexOf(toolId);
    let isNowFavorite = false;

    if (index >= 0) {
      current.splice(index, 1);
      isNowFavorite = false;
    } else {
      current.unshift(toolId);
      isNowFavorite = true;
    }

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
    } catch (e) {
      console.error(e);
    }

    notifyChange();
    return isNowFavorite;
  }

  public isFavorite(toolId: string): boolean {
    return this.getFavorites().includes(toolId);
  }

  // --- RECENTLY USED ---

  public getRecentlyUsed(): AITool[] {
    if (typeof window === 'undefined') return [];
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      return ids
        .map(id => this.getToolById(id))
        .filter((t): t is AITool => Boolean(t))
        .slice(0, 15);
    } catch {
      return [];
    }
  }

  public addRecentlyUsed(toolId: string): void {
    if (typeof window === 'undefined') return;
    try {
      let ids: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      ids = [toolId, ...ids.filter(id => id !== toolId)].slice(0, 20);
      localStorage.setItem(RECENT_KEY, JSON.stringify(ids));
      notifyChange();
    } catch (e) {
      console.error(e);
    }
  }

  public clearRecentlyUsed(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(RECENT_KEY);
    notifyChange();
  }

  // --- REPORTS ---

  public getReports(): ReportItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(REPORTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public async submitReport(report: Omit<ReportItem, 'id' | 'createdAt' | 'status'>): Promise<ReportItem> {
    const newReport: ReportItem = {
      ...report,
      id: 'rep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const current = this.getReports();
    current.unshift(newReport);

    try {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(current));
    } catch (e) {
      console.error(e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('reports').insert({
          tool_id: report.toolId,
          tool_name: report.toolName,
          reason: report.reason,
          details: report.details,
          user_email: report.userEmail,
          status: 'pending'
        });
      } catch (err) {
        console.warn('Supabase report submit sync:', err);
      }
    }

    notifyChange();
    return newReport;
  }

  public updateReportStatus(reportId: string, status: 'pending' | 'resolved' | 'dismissed'): void {
    const current = this.getReports();
    const item = current.find(r => r.id === reportId);
    if (item) {
      item.status = status;
      try {
        localStorage.setItem(REPORTS_KEY, JSON.stringify(current));
      } catch {}
      notifyChange();
    }
  }

  public deleteReport(reportId: string): void {
    const current = this.getReports().filter(r => r.id !== reportId);
    try {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(current));
    } catch {}
    notifyChange();
  }

  // --- BACKUP & RESTORE ---

  public exportBackup(): string {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      tools: this.getAllTools(),
      reports: this.getReports()
    };
    return JSON.stringify(data, null, 2);
  }

  public importBackup(jsonString: string): { success: boolean; count: number; error?: string } {
    try {
      const data = JSON.parse(jsonString);
      if (!Array.isArray(data.tools)) {
        return { success: false, count: 0, error: 'Invalid backup structure. "tools" must be an array.' };
      }
      this.memoryTools = data.tools;
      localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
      if (Array.isArray(data.reports)) {
        localStorage.setItem(REPORTS_KEY, JSON.stringify(data.reports));
      }
      notifyChange();
      return { success: true, count: data.tools.length };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Failed to parse JSON backup.' };
    }
  }

  public resetToDefault(): void {
    this.memoryTools = [...INITIAL_TOOLS];
    try {
      localStorage.setItem(TOOLS_KEY, JSON.stringify(this.memoryTools));
    } catch {}
    notifyChange();
  }
}

export const toolStorage = new ToolStorage();
