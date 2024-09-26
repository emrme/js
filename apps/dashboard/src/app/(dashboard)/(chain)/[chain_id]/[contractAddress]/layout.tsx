import { ChakraProviderSetup } from "@/components/ChakraProviderSetup";
import { SidebarLayout } from "@/components/blocks/SidebarLayout";
import { ContractMetadata } from "components/custom-contract/contract-header/contract-metadata";
import { DeprecatedAlert } from "components/shared/DeprecatedAlert";
import { PrimaryDashboardButton } from "contract-ui/components/primary-dashboard-button";
import { ConfigureCustomChain } from "./ConfigureCustomChain";
import { getContractPageParamsInfo } from "./_utils/getContractFromParams";
import { getContractPageMetadata } from "./_utils/getContractPageMetadata";
import { getContractPageSidebarLinks } from "./_utils/getContractPageSidebarLinks";

export default async function Layout(props: {
  params: {
    contractAddress: string;
    chain_id: string;
  };
  children: React.ReactNode;
}) {
  const info = await getContractPageParamsInfo(props.params);

  if (!info) {
    return <ConfigureCustomChain chainSlug={props.params.chain_id} />;
  }

  const { contract, chainMetadata } = info;
  const contractPageMetadata = await getContractPageMetadata(contract);
  const sidebarLinks = getContractPageSidebarLinks({
    chainSlug: chainMetadata.slug,
    contractAddress: contract.address,
    metadata: contractPageMetadata,
  });

  return (
    <ChakraProviderSetup>
      <SidebarLayout sidebarLinks={sidebarLinks}>
        <div className="border-border border-b pb-8">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <ContractMetadata contract={contract} chain={chainMetadata} />
              <PrimaryDashboardButton
                contractAddress={contract.address}
                chain={contract.chain}
                contractInfo={{
                  chain: chainMetadata,
                  chainSlug: chainMetadata.slug,
                  contractAddress: contract.address,
                }}
              />
            </div>
            <DeprecatedAlert chain={chainMetadata} />
          </div>
        </div>
        <div className="h-8" />
        <div className="pb-10">{props.children}</div>
      </SidebarLayout>
    </ChakraProviderSetup>
  );
}
