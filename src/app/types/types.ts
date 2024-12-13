export type OfferTagType = 'Operator' | 'Fast' | 'Node Runner' | 'Fastest' | string;

export interface Tag {
  name: OfferTagType;
  __typename?: string;
}

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

export interface AvailableLiquidity {
  amount: number;
  total: number;
}

export interface ChannelInfo {
  count: number;
  btcCap: number;
}

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
  //Optional??
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

export interface OffersResponse {
  getOffers: {
    list: Offer[];
  };
}
