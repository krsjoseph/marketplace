export const formatBTC = (sats: string): string => {
  return (parseInt(sats) / 100000000).toFixed(3);
};

export const blockLengthToDays = (blocks: number): string => {
  const days = Math.round(blocks / 144);
  return `~${days}d`;
};

export const calculateAPR = (feeRate: number): string => {
  return (feeRate * 365 / 10000).toFixed(2);
};
