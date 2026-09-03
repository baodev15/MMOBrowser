import { useCallback } from "react";
import type { CloudAuthState, CloudUser } from "@/types";

interface UseCloudAuthReturn {
  user: CloudUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  exchangeDeviceCode: (code: string) => Promise<CloudAuthState>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<CloudUser>;
}

const UNLOCKED_USER: CloudUser = {
  id: "local",
  email: "local@donut",
  plan: "team",
  planPeriod: "lifetime",
  subscriptionStatus: "active",
  profileLimit: Number.POSITIVE_INFINITY,
  cloudProfilesUsed: 0,
  proxyBandwidthLimitMb: Number.POSITIVE_INFINITY,
  proxyBandwidthUsedMb: 0,
  proxyBandwidthExtraMb: 0,
  entitlements: {
    active: true,
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: true,
    cookieBot: true,
    remoteInteractive: true,
    profileLimit: Number.POSITIVE_INFINITY,
    requestsPerHour: Number.POSITIVE_INFINITY,
    remoteBrowserHours: Number.POSITIVE_INFINITY,
  },
};

const UNLOCKED_STATE: CloudAuthState = {
  user: UNLOCKED_USER,
  logged_in_at: "1970-01-01T00:00:00.000Z",
};

const noop = () => {};

export function useCloudAuth(): UseCloudAuthReturn {
  const exchangeDeviceCode = useCallback(
    async (_code: string): Promise<CloudAuthState> => UNLOCKED_STATE,
    [],
  );
  const logout = useCallback(async () => noop(), []);
  const refreshProfile = useCallback(
    async (): Promise<CloudUser> => UNLOCKED_USER,
    [],
  );

  return {
    user: UNLOCKED_USER,
    isLoggedIn: true,
    isLoading: false,
    exchangeDeviceCode,
    logout,
    refreshProfile,
  };
}
