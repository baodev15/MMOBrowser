import type { CloudUser, Entitlements } from "@/types";

const UNLOCKED: Entitlements = {
  active: true,
  browserAutomation: true,
  crossOsFingerprints: true,
  cloudBackup: false,
  teamCollaboration: false,
  cookieBot: false,
  remoteInteractive: false,
  profileLimit: Number.POSITIVE_INFINITY,
  requestsPerHour: Number.POSITIVE_INFINITY,
  remoteBrowserHours: 0,
};

export function getEntitlements(
  _user: CloudUser | null | undefined,
): Entitlements {
  return UNLOCKED;
}

export function canUseCookieBot(_user: CloudUser | null | undefined): boolean {
  // Cookie Bot is a Donut cloud fleet feature and is not offered without server login.
  return false;
}

export function isTeamOwner(_user: CloudUser | null | undefined): boolean {
  return false;
}
