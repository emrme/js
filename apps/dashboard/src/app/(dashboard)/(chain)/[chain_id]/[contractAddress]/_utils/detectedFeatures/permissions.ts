import {
  isGetRoleAdminSupported,
  isGetRoleMemberCountSupported,
  isGetRoleMemberSupported,
  isGrantRoleSupported,
  isHasRoleSupported,
  isRenounceRoleSupported,
  isRevokeRoleSupported,
} from "thirdweb/extensions/permissions";

export function isPermissionsSupported(functionSelectors: string[]) {
  return [
    isGetRoleAdminSupported(functionSelectors),
    isGrantRoleSupported(functionSelectors),
    isHasRoleSupported(functionSelectors),
    isRenounceRoleSupported(functionSelectors),
    isRevokeRoleSupported(functionSelectors),
  ].every(Boolean);
}

export function isPermissionsEnumerableSupported(functionSelectors: string[]) {
  return (
    isPermissionsSupported(functionSelectors) &&
    [
      isGetRoleMemberSupported(functionSelectors),
      isGetRoleMemberCountSupported(functionSelectors),
    ].every(Boolean)
  );
}
