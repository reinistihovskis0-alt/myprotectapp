
export interface AppConfig {
  blockAdultContent: boolean;
  blockEscortSites: boolean;
  blockShortVideos: boolean;
  youtubeDailyLimit: number;
  isLocked: boolean;
  masterPassword: string; // 20-character passphrase
  isStealthMode: boolean; // If true, show decoy UI when locked
  deepFreezeActive: boolean; // Prevents any setting changes without re-auth
}

export interface UsageStats {
  todayYoutube: number;
  blockedAttempts: number;
  threatLevel: 'LOW' | 'MEDIUM' | 'CRITICAL';
  lastSync: Date;
}
