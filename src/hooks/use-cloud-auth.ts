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

const noop = () => {};

export function useCloudAuth(): UseCloudAuthReturn {
  const exchangeDeviceCode = useCallback(
    async (_code: string): Promise<CloudAuthState> => {
      throw new Error("Cloud login is not available in this build");
    },
    [],
  );
  const logout = useCallback(async () => noop(), []);
  const refreshProfile = useCallback(async (): Promise<CloudUser> => {
    throw new Error("Cloud login is not available in this build");
  }, []);

  return {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    exchangeDeviceCode,
    logout,
    refreshProfile,
  };
}
