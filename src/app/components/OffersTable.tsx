import React from 'react';
import { EmptyState } from './states/EmptyState';
import { ErrorState } from './states/ErrorState';
import { LoadingState } from './states/LoadingState';
import { useOffersValidation } from '../hooks/useOffersValidation';
import { blockLengthToDays, calculateAPR, formatBTC } from '../utils/formatting';
import numeral from 'numeral';
import { OfferCard } from './OfferCard';
import { TableHeader } from './TableHeader';
import { AlertTriangle } from 'lucide-react';
import { Offer } from '../types/types';

interface OffersTableProps {
  offers: Offer[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export const OffersTable: React.FC<OffersTableProps> = ({
  offers,
  isLoading = false,
  error = null,
  onRetry
}) => {
  const {
    validOffers,
    invalidOffers,
    hasInvalidOffers
  } = useOffersValidation(offers);

  React.useEffect(() => {
    if (hasInvalidOffers) {
      console.warn('Invalid offers detected:', invalidOffers);
    }
  }, [hasInvalidOffers, invalidOffers]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  if (!validOffers.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {hasInvalidOffers && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Some offers were invalid and have been filtered out.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-white/10 bg-black/20 overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader />
          <tbody>
            {validOffers.map((offer) => {
              const availableLiquidity = parseInt(offer.total_size) - parseInt(offer.orders.locked_size);

              return (
                <tr
                  key={offer.id}
                  className="border-b border-white/10 hover:bg-[#171717] transition-colors duration-200 h-20"
                >
                  <td className="px-4 py-1 h-20 overflow-hidden">
                    <OfferCard offer={offer} />
                  </td>
                  <td className="px-4 py-1 h-20">
                    {offer.seller_score}/<span className="text-gray-300">100</span>
                  </td>
                  <td className="px-4 py-1 h-20">{numeral(offer.base_fee).format('0,0')}</td>
                  <td className="px-4 py-1 h-20">{numeral(offer.fee_rate_cap).format('0,0')}</td>
                  <td className="px-4 py-1 h-20">{blockLengthToDays(offer.min_block_length)}</td>
                  <td className="px-4 py-1 h-20">{numeral(offer.fee_rate).format('0,0')}</td>
                  <td className="px-4 py-1 h-20">{calculateAPR(offer.fee_rate)}%</td>
                  <td className="px-4 py-1 h-20">{calculateAPR(offer.fee_rate_cap)}%</td>
                  <td className="px-4 py-1 h-20">{formatBTC(offer.min_size)}</td>
                  <td className="px-4 py-1 h-20">{formatBTC(offer.max_size)}</td>
                  <td className="px-4 py-1 h-20 overflow-hidden">
                    <div>
                      {formatBTC(availableLiquidity.toString())} BTC
                      <div className="text-sm text-[#D4D4D4]">
                        Total: {formatBTC(offer.total_size)} BTC
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-1 h-20 overflow-hidden">
                    <div>
                      <p className="text-sm text-[#D4D4D4]">{(Math.floor(Math.random() * 150) + 1)} orders</p>
                      <div className="text-sm text-[#D4D4D4]">
                        {formatBTC(offer.total_size)} BTC capacity
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
