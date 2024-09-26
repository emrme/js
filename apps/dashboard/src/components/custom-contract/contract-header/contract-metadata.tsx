import { getThirdwebClient } from "@/constants/thirdweb.server";
import { fetchDashboardContractMetadata } from "@3rdweb-sdk/react/hooks/useDashboardContractMetadata";
import { fetchPublishedContractsFromDeploy } from "components/contract-components/fetchPublishedContractsFromDeploy";
import type { ThirdwebContract } from "thirdweb";
import type { ChainMetadata } from "thirdweb/chains";
import { MetadataHeader } from "./metadata-header";

interface ContractMetadataProps {
  contract: ThirdwebContract;
  chain: ChainMetadata;
}

export async function ContractMetadata({
  contract,
  chain,
}: ContractMetadataProps) {
  const promiseValues = await Promise.allSettled([
    fetchDashboardContractMetadata(contract),
    fetchPublishedContractsFromDeploy({
      contract,
      client: getThirdwebClient(),
    }),
  ]);

  const contractMetadata =
    promiseValues[0].status === "fulfilled"
      ? promiseValues[0].value
      : undefined;

  const publishedContractsFromDeploy =
    promiseValues[1].status === "fulfilled"
      ? promiseValues[1].value
      : undefined;

  const latestPublished = publishedContractsFromDeploy?.slice(-1)[0];

  return (
    <MetadataHeader
      data={contractMetadata}
      chain={chain}
      address={contract.address}
      externalLinks={latestPublished?.externalLinks}
    />
  );
}
