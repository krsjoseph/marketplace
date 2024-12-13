import { OfferTagType } from "../types/types";
import { TAG_COLORS } from "../utils/offer-tag-styles";

interface OfferTagProps {
  name: OfferTagType;
}

export const OfferTag: React.FC<OfferTagProps> = ({ name }) => {
  const colors = TAG_COLORS[name] || TAG_COLORS.default;
  
  return (
    <span
      className="px-1 h-5 text-xs font-semibold leading-4 rounded-lg border-2"
      style={{
        borderColor: colors.border,
        color: colors.text
      }}
    >
      {name}
    </span>
  );
};
