import type { CloudUser, Entitlements } from "@/types";

const UNLOCKED: Entitlements = {
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
};

export function getEntitlements(
  _user: CloudUser | null | undefined,
): Entitlements {
  return UNLOCKED;
}

export function canUseCookieBot(_user: CloudUser | null | undefined): boolean {
  return true;
}

export function isTeamOwner(_user: CloudUser | null | undefined): boolean {
  return false;
}
