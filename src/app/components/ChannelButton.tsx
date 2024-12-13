interface ChannelButtonProps {
  variant: 'buy' | 'sell';
  onClick?: () => void;
}

const buttonStyles = {
  buy: "px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors",
  sell: "px-4 py-2 text-sm font-medium text-white bg-black rounded-md border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
} as const;

export const ChannelButton: React.FC<ChannelButtonProps> = ({ variant = 'buy', onClick }) => (
  <button
    className={buttonStyles[variant]}
    onClick={onClick}
  >
    {variant === 'buy' ? 'Buy Channels' : 'Sell Channels'}
  </button>
);
