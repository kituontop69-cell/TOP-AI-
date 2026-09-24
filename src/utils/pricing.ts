import type { PricingType } from '../types';

export interface PricingConfig {
  type: PricingType;
  label: string;
  shortLabel: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  emoji: string;
  description: string;
}

export const PRICING_CONFIGS: Record<PricingType, PricingConfig> = {
  'free': {
    type: 'free',
    label: 'FREE FOREVER',
    shortLabel: 'FREE',
    badgeBg: 'bg-[#FFFFFF]',
    badgeText: 'text-[#000000]',
    badgeBorder: 'border-2 border-[#000000]',
    dotColor: 'bg-[#FF4D00]',
    emoji: '●',
    description: '100% free forever without subscriptions or paywalls.'
  },
  'free-tier': {
    type: 'free-tier',
    label: 'FREE TIER',
    shortLabel: 'TIER',
    badgeBg: 'bg-[#000000]',
    badgeText: 'text-[#FF4D00]',
    badgeBorder: 'border-2 border-[#000000]',
    dotColor: 'bg-[#FF4D00]',
    emoji: '●',
    description: 'Permanent recurring free quota with limits.'
  },
  'free-credits': {
    type: 'free-credits',
    label: 'FREE CREDITS',
    shortLabel: 'CREDITS',
    badgeBg: 'bg-[#FF4D00]',
    badgeText: 'text-[#000000]',
    badgeBorder: 'border-2 border-[#000000]',
    dotColor: 'bg-[#000000]',
    emoji: '★',
    description: 'Includes initial test credits or daily allotment.'
  },
  'open-source': {
    type: 'open-source',
    label: 'OPEN SOURCE',
    shortLabel: 'OSS',
    badgeBg: 'bg-[#000000]',
    badgeText: 'text-[#FFFFFF]',
    badgeBorder: 'border-2 border-[#FFFFFF]',
    dotColor: 'bg-[#FFFFFF]',
    emoji: '◈',
    description: 'Open source weights, runs locally or free community hosting.'
  },
  'limited-free': {
    type: 'limited-free',
    label: 'LIMITED FREE',
    shortLabel: 'LIMITED',
    badgeBg: 'bg-[#000000]',
    badgeText: 'text-[#FFFFFF]',
    badgeBorder: 'border-2 border-[#FF4D00]',
    dotColor: 'bg-[#FF4D00]',
    emoji: '▲',
    description: 'Generous free access with rate limits or watermarks.'
  },
  'paid': {
    type: 'paid',
    label: 'PAID ONLY',
    shortLabel: 'PAID',
    badgeBg: 'bg-[#000000]',
    badgeText: 'text-[#FFFFFF]',
    badgeBorder: 'border-2 border-[#000000]',
    dotColor: 'bg-[#000000]',
    emoji: '■',
    description: 'Requires paid subscription or enterprise license.'
  }
};

export function getPricingConfig(type: PricingType): PricingConfig {
  return PRICING_CONFIGS[type] || PRICING_CONFIGS['free-tier'];
}
