import { useCallback } from "react";

export interface TrialStatusActive {
  type: "Active";
  remaining_seconds: number;
  days_remaining: number;
  hours_remaining: number;
  minutes_remaining: number;
}

export interface TrialStatusExpired {
  type: "Expired";
}

export type TrialStatus = TrialStatusActive | TrialStatusExpired;

interface UseCommercialTrialReturn {
  trialStatus: TrialStatus | null;
  hasAcknowledged: boolean;
  isLoading: boolean;
  checkTrialStatus: () => Promise<void>;
}

const ACTIVE_FOREVER: TrialStatusActive = {
  type: "Active",
  remaining_seconds: Number.POSITIVE_INFINITY,
  days_remaining: Number.POSITIVE_INFINITY,
  hours_remaining: Number.POSITIVE_INFINITY,
  minutes_remaining: Number.POSITIVE_INFINITY,
};

export function useCommercialTrial(): UseCommercialTrialReturn {
  const checkTrialStatus = useCallback(async () => {}, []);
  return {
    trialStatus: ACTIVE_FOREVER,
    hasAcknowledged: true,
    isLoading: false,
    checkTrialStatus,
  };
}
