import { z } from 'zod';

export const TagNameEnum = z.enum([
  'Operator',
  'Fast',
  'Node Runner',
  'Fastest',
]).or(z.string());

export const TagSchema = z.object({
  name: TagNameEnum,
  __typename: z.string().optional(),
});

export const OfferConditionsSchema = z.object({
  condition: z.string(),
  operator: z.string(),
  value: z.string(),
  __typename: z.string().optional(),
});

export const OfferOrdersSchema = z.object({
  locked_size: z.string().regex(/^\d+$/),
  count: z.number().optional(),
  capacity: z.number().optional(),
  __typename: z.string().optional(),
});

export const AvailableLiquiditySchema = z.object({
  amount: z.number().min(0),
  total: z.number().min(0),
});

export const ChannelInfoSchema = z.object({
  count: z.number().min(0),
  btcCap: z.number().min(0),
});

export const OfferSchema = z.object({
  // Required fields
  id: z.string(),
  account: z.string().min(1),
  amboss_fee_rate: z.number().min(0),
  base_fee: z.number().min(0),
  base_fee_cap: z.number().min(0),
  conditions: z.array(OfferConditionsSchema),
  fee_rate: z.number().min(0),
  fee_rate_cap: z.number().min(0),
  max_size: z.string().regex(/^\d+$/),
  min_block_length: z.number().min(0),
  min_size: z.string().regex(/^\d+$/),
  offer_type: z.string(),
  onchain_multiplier: z.number().nullable(),
  onchain_priority: z.string().nullable(),
  orders: OfferOrdersSchema,
  seller_score: z.string(),
  side: z.string(),
  status: z.string(),
  tags: z.array(TagSchema),
  total_size: z.string().regex(/^\d+$/),
  __typename: z.string().optional(),

  // Optional fields
  name: z.string().optional(),
  icon: z.string().optional(),
  score: z.number().min(0).optional(),
  maxScore: z.number().min(0).optional(),
  fixed: z.number().min(0).optional(),
  maxFeeRate: z.number().min(0).optional(),
  minChannelAge: z.string().optional(),
  variablePpm: z.number().min(0).optional(),
  minApr: z.number().min(0).optional(),
  maxApr: z.number().min(0).optional(),
  availableLiquidity: AvailableLiquiditySchema.optional(),
  channelInfo: ChannelInfoSchema.optional(),
}).refine(data => {
  const minSize = BigInt(data.min_size);
  const maxSize = BigInt(data.max_size);
  return minSize <= maxSize;
}, {
  message: "Min size must be less than or equal to max size"
}).refine(data => {
  const totalSize = BigInt(data.total_size);
  const lockedSize = BigInt(data.orders.locked_size);
  return lockedSize <= totalSize;
}, {
  message: "Locked size cannot exceed total size"
}).refine(data => {
  if (data.minApr && data.maxApr) {
    return data.minApr <= data.maxApr;
  }
  return true;
}, {
  message: "Min APR must be less than or equal to Max APR"
});

export type ValidatedOffer = z.infer<typeof OfferSchema>;
