import { fetchDeployMetadata as sdkFetchDeployMetadata } from "thirdweb/contract";
import { getThirdwebClient } from "../../@/constants/thirdweb.server";
import { removeUndefinedFromObjectDeep, toContractIdIpfsHash } from "./hooks";

// metadata PRE publish, only has the compiler output info (from CLI)

export async function fetchDeployMetadata(contractId: string) {
  const contractIdIpfsHash = toContractIdIpfsHash(contractId);

  return removeUndefinedFromObjectDeep(
    await sdkFetchDeployMetadata({
      client: getThirdwebClient(),
      uri: contractIdIpfsHash,
    }),
  );
}
