import { OfferTagType } from "../types/types";

export const TAG_COLORS: Record<OfferTagType, { border: string; text: string }> = {
  'Operator': { border: '#FACC15', text: '#FACC15' },
  'Fast': { border: '#60A5FA', text: '#60A5FA' },
  'Node Runner': { border: '#A3E635', text: '#A3E635' },
  'Fastest': { border: '#E879F9', text: '#E879F9' },
  'default': { border: 'rgba(255, 255, 255, 0.2)', text: 'rgba(255, 255, 255, 0.8)' }
};

