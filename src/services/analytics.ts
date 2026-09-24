export type AnalyticsEvent = 
  | 'tool_opened'
  | 'search_performed'
  | 'category_viewed'
  | 'favorite_added'
  | 'install_clicked'
  | 'report_submitted'
  | 'filter_applied'
  | 'share_clicked';

interface EventLog {
  id: string;
  event: AnalyticsEvent;
  metadata?: Record<string, any>;
  timestamp: string;
}

const ANALYTICS_KEY = 'aivault_analytics_log_v1';

class AnalyticsService {
  private logs: EventLog[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(ANALYTICS_KEY);
        if (stored) this.logs = JSON.parse(stored);
      } catch {}
    }
  }

  public track(event: AnalyticsEvent, metadata?: Record<string, any>): void {
    const entry: EventLog = {
      id: Math.random().toString(36).substring(2, 9),
      event,
      metadata,
      timestamp: new Date().toISOString()
    };

    this.logs.unshift(entry);
    // Keep max 200 anonymous local records for admin insights
    if (this.logs.length > 200) {
      this.logs = this.logs.slice(0, 200);
    }

    try {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(this.logs));
    } catch {}
  }

  public getRecentLogs(): EventLog[] {
    return [...this.logs];
  }

  public getEventSummary(): Record<AnalyticsEvent, number> {
    const counts: Record<string, number> = {
      tool_opened: 0,
      search_performed: 0,
      category_viewed: 0,
      favorite_added: 0,
      install_clicked: 0,
      report_submitted: 0,
      filter_applied: 0,
      share_clicked: 0
    };

    for (const log of this.logs) {
      if (counts[log.event] !== undefined) {
        counts[log.event]++;
      }
    }

    return counts as Record<AnalyticsEvent, number>;
  }

  public clear(): void {
    this.logs = [];
    try {
      localStorage.removeItem(ANALYTICS_KEY);
    } catch {}
  }
}

export const analytics = new AnalyticsService();
