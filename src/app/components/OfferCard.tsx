import React from "react";
import { Offer } from "../types/types";
import { formatBTC } from "../utils/formatting";
import { OfferTag } from "./OfferTag";

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const gradientAngle = React.useMemo(() => Math.random() * 360, []);
  const channelCount = React.useMemo(() => Math.floor(Math.random() * 1000) + 1, []);

  return (
    <div className="flex flex-row gap-3 items-start">
      <div
        className="h-10 w-10 rounded-lg shrink-0"
        style={{
          background: `linear-gradient(${gradientAngle}deg, #7928CA, #FF0080)`
        }}
      />
      <div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px]">{offer.account.substring(0, 8)}...</span>
        </div>
        <div className="flex gap-1">
          {offer.tags.map((tag) => (
            <OfferTag key={tag.name} name={tag.name} />
          ))}
        </div>
        <div className="text-xs text-[#D4D4D4] py-1">
          {channelCount} ch / {formatBTC(offer.total_size).replace('.', '')} BTC cap
        </div>
      </div>
    </div>
  );
};
