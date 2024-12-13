import React from 'react';
import { render, screen } from '@testing-library/react';
import { OffersTable } from './OffersTable';
import { useOffersValidation } from '../hooks/useOffersValidation';
import { formatBTC } from '../utils/formatting';
import type { Offer } from '../types/types';

jest.mock('../hooks/useOffersValidation');
const mockUseOffersValidation = useOffersValidation as jest.MockedFunction<typeof useOffersValidation>;

jest.mock('../utils/formatting', () => ({
  blockLengthToDays: (blocks: number) => `${blocks} days`,
  calculateAPR: (rate: number) => rate.toString(),
  formatBTC: (amount: string) => `${amount} BTC`
}));

describe('OffersTable', () => {
  const mockOffer: Offer = {
    id: '1',
    account: 'test-account',
    amboss_fee_rate: 1000,
    base_fee: 1000,
    base_fee_cap: 2000,
    conditions: [
      {
        condition: 'min_node_age',
        operator: 'gte',
        value: '30',
        __typename: 'OfferCondition'
      }
    ],
    fee_rate: 2000,
    fee_rate_cap: 5000,
    max_size: '1000000',
    min_block_length: 144,
    min_size: '100000',
    offer_type: 'standard',
    onchain_multiplier: 1,
    onchain_priority: 'medium',
    orders: {
      locked_size: '500000',
      count: 10,
      capacity: 1500000,
      __typename: 'OfferOrders'
    },
    seller_score: '95',
    side: 'buy',
    status: 'active',
    tags: [
      {
        name: 'Fast',
        __typename: 'Tag'
      }
    ],
    total_size: '2000000',
    __typename: 'Offer',
    availableLiquidity: {
      amount: 1500000,
      total: 2000000
    },
    channelInfo: {
      count: 10,
      btcCap: 1.5
    }
  };

  beforeEach(() => {
    mockUseOffersValidation.mockReturnValue({
      validOffers: [mockOffer],
      invalidOffers: [],
      hasInvalidOffers: false
    });
  });

  it('renders loading state when isLoading is true', () => {
    render(<OffersTable offers={[]} isLoading={true} />);
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('renders error state when error is present', () => {
    const error = new Error('Test error');
    render(<OffersTable offers={[]} error={error} />);
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
  });

  it('renders empty state when no valid offers are present', () => {
    mockUseOffersValidation.mockReturnValueOnce({
      validOffers: [],
      invalidOffers: [],
      hasInvalidOffers: false
    });
    render(<OffersTable offers={[]} />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('renders offers table with valid offers', () => {
    render(<OffersTable offers={[mockOffer]} />);
    
    // Check seller score - look for individual parts
    expect(screen.getByText('95/')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    
    // Check formatted numbers
    expect(screen.getByText('1,000')).toBeInTheDocument(); // base fee
    expect(screen.getByText('5,000')).toBeInTheDocument(); // fee rate cap
  });

  it('calculates and displays available liquidity correctly', () => {
    render(<OffersTable offers={[mockOffer]} />);
    
    const availableLiquidity = parseInt(mockOffer.total_size) - parseInt(mockOffer.orders.locked_size);
    const formattedLiquidity = formatBTC(availableLiquidity.toString());
    const formattedTotal = formatBTC(mockOffer.total_size);
    
    expect(screen.getByText(new RegExp(formattedLiquidity))).toBeInTheDocument();
    expect(screen.getByText(`Total: ${formattedTotal} BTC`)).toBeInTheDocument();
  });

  it('displays channel information correctly', () => {
    render(<OffersTable offers={[mockOffer]} />);
    
    const formattedCapacity = formatBTC(mockOffer.total_size);
    
    expect(screen.getByText(`${formattedCapacity} BTC capacity`)).toBeInTheDocument();
    // Note: We can't test for the exact number of orders since it's random for now
    expect(screen.getByText(/orders$/)).toBeInTheDocument();
  });
});