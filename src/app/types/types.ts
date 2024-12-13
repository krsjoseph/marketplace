export type OfferTagType = 'Operator' | 'Fast' | 'Node Runner' | 'Fastest' | 'Builder' | string;

export interface Tag {
  name: OfferTagType;
  __typename?: string;
}

// Order related types
export interface OfferOrders {
  locked_size: string;
  count?: number;
  capacity?: number;
  __typename?: string;
}

export interface OfferConditions {
  condition: string;
  operator: string;
  value: string;
  __typename?: string;
}

// Liquidity and channel information
export interface AvailableLiquidity {
  amount: number;
  total: number;
}

export interface ChannelInfo {
  count: number;
  btcCap: number;
}

// Main offer type
export interface Offer {
  id: string;
  account: string;
  amboss_fee_rate: number;
  base_fee: number;
  base_fee_cap: number;
  conditions: OfferConditions[];
  fee_rate: number;
  fee_rate_cap: number;
  max_size: string;
  min_block_length: number;
  min_size: string;
  offer_type: string;
  onchain_multiplier: number | null;
  onchain_priority: string | null;
  orders: OfferOrders;
  seller_score: string;
  side: string;
  status: string;
  tags: Tag[];
  total_size: string;
  __typename?: string;
  // Optional fields
  name?: string;
  icon?: string;
  score?: number;
  maxScore?: number;
  fixed?: number;
  maxFeeRate?: number;
  minChannelAge?: string;
  variablePpm?: number;
  minApr?: number;
  maxApr?: number;
  availableLiquidity?: AvailableLiquidity;
  channelInfo?: ChannelInfo;
}

// Response types
export interface OffersResponse {
  getOffers: {
    list: Offer[];
  };
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
  }>;
  extensions?: {
    cost: {
      requestedQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
}