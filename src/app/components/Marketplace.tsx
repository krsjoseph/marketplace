import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Loader2 } from 'lucide-react';
import { GET_OFFERS } from '../graphql/queries';
import { Header } from './Header';
import { ChannelButton } from './ChannelButton';
import { OffersResponse } from '../types/types';
import { OffersTable } from './OffersTable';

const backgroundOption1 = `
  linear-gradient(
    to right, 
    rgba(10, 10, 10, 1) 0%,
    rgba(10, 10, 10, 0.9) 5%,
    rgba(121, 40, 202, 0.05) 30%,
    rgba(121, 40, 202,  0.05) 40%,
    rgba(188, 20, 165,  0.05) 50%,
    rgba(255, 0, 128, 0.05) 60%,
    rgba(255, 0, 128,  0.05) 75%,
    rgba(10, 10, 10, 0.09) 80%,
    rgba(10, 10, 10, 0.9) 95%,
    rgba(10, 10, 10, 1) 100%
  ),
  repeating-radial-gradient(
    circle at 50% 0%,
    transparent 0,
    rgba(121, 40, 202, 0.03) 2px,
    transparent 4px
  ),
  rgb(10, 10, 10)
`;

// different option for background will explain difference during call
// const backgroundOption2 = `
//   radial-gradient(
//     circle at 50% 0%, 
//     rgba(121, 40, 202, 0.12) 0%,
//     rgba(121, 40, 202, 0.06) 25%,
//     rgba(255, 0, 128, 0.02) 50%,
//     rgba(10, 10, 10, 1) 70%
//   ),
//   repeating-radial-gradient(
//     circle at 50% 0%,
//     transparent 0,
//     rgba(121, 40, 202, 0.03) 2px,
//     transparent 4px
//   ),
//   rgb(10, 10, 10)
// `;

const FullPageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] bg-opacity-90 z-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
      <p className="text-white text-lg">Loading marketplace...</p>
    </div>
  </div>
);

export function Marketplace() {
  const [search, setSearch] = useState('');
  const { loading, error, data, refetch } = useQuery<OffersResponse>(GET_OFFERS);

  const offers = data?.getOffers?.list ?? [];

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white w-full"
      style={{
        background: backgroundOption1,
        backgroundBlendMode: 'normal, overlay',
        backgroundSize: '100% 200px, 100% 200px',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Header search={search} onSearchChange={setSearch} />

      <main className="m-5">
        <div className="px-1 mx-6">
          <div className="flex items-center justify-between mt-8 mb-6">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              Explore Offers
              <span>({offers.length})</span>
            </h1>
            <div className="flex gap-4">
              <ChannelButton variant="sell" />
              <ChannelButton variant="buy" />
            </div>
          </div>
          <div className="mt-8">
            {error ? (
              <div className="text-red-500 text-center">Error loading offers</div>
            ) : (
              <OffersTable 
                offers={offers}
                isLoading={loading}
                error={error}
                onRetry={() => refetch()} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}