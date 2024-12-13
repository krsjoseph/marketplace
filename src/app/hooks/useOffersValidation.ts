import { useState, useEffect } from 'react';
import { OfferSchema, ValidatedOffer } from '../validation/offers';

interface ValidationResult {
  validOffers: ValidatedOffer[];
  invalidOffers: Array<{
    offer: unknown;
    error: string;
  }>;
  hasInvalidOffers: boolean;
}

export const useOffersValidation = (rawOffers: unknown[]): ValidationResult => {
  const [result, setResult] = useState<ValidationResult>({
    validOffers: [],
    invalidOffers: [],
    hasInvalidOffers: false
  });

  useEffect(() => {
    const validatedOffers: ValidatedOffer[] = [];
    const invalidOffers: Array<{ offer: unknown; error: string }> = [];

    rawOffers.forEach((offer) => {
      try {
        const validOffer = OfferSchema.parse(offer);
        validatedOffers.push(validOffer);
      } catch (error) {
        invalidOffers.push({
          offer,
          error: error instanceof Error ? error.message : 'Invalid offer data'
        });
      }
    });

    setResult({
      validOffers: validatedOffers,
      invalidOffers,
      hasInvalidOffers: invalidOffers.length > 0
    });
  }, [rawOffers]);

  return result;
};
