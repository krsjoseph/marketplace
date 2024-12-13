import { InfoIcon } from "lucide-react";

export const TableHeader: React.FC = () => (
  <thead>
    <tr className="border-b border-white/10">
      <th className="px-4 py-2 text-left" colSpan={2}></th>
      <th className="px-4 py-2 text-left text-sm font-medium" colSpan={2}>
        Cost
      </th>
      <th className="px-4 py-2 text-left text-sm font-medium" colSpan={2}>
        Promises
      </th>
      <th className="px-4 py-2 text-left text-sm font-medium" colSpan={2}>
        APR
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium" colSpan={2}>
        Size Limits
      </th>
      <th className="px-4 py-2 text-left" colSpan={2}></th>
    </tr>
    <tr className="border-b border-white/10 text-left text-sm text-[#A3A3A3] ">
      <th className="px-4 py-2 font-medium">Seller</th>
      <th className="px-4 py-2 font-medium">
        Seller Score
        <InfoIcon className="inline-block ml-1 w-4 h-4" strokeWidth={3} />
      </th>            
      <th className="px-4 py-2 font-medium">Fixed (sats)</th>
      <th className="px-1 py-2 font-medium">Max Fee Rate <br />(ppm)</th>
      <th className="px-4 py-2 font-medium">Min Channel <br /> Age</th>
      <th className="px-4 py-2 font-medium">Variable (ppm)</th>
      <th className="px-4 py-2 font-medium">Min</th>
      <th className="px-4 py-2 font-medium">Max</th>
      <th className="px-4 py-2 font-medium">Min</th>
      <th className="px-4 py-2 font-medium">Max</th>
      <th className="px-4 py-2 font-medium">Available <br /> Liquidity</th>
      <th className="px-4 py-2 font-medium">History</th>
    </tr>
  </thead>
);
