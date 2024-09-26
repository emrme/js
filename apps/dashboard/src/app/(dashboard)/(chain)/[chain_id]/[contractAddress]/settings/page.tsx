import { notFound } from "next/navigation";
import {
  isGetContractMetadataSupported,
  isGetDefaultRoyaltyInfoSupported,
  isGetPlatformFeeInfoSupported,
  isPrimarySaleRecipientSupported,
  isSetContractMetadataSupported,
  isSetDefaultRoyaltyInfoSupported,
  isSetPlatformFeeInfoSupported,
  isSetPrimarySaleRecipientSupported,
} from "thirdweb/extensions/common";
import { ContractSettingsPage } from "../../../../../../contract-ui/tabs/settings/page";
import { getContractPageParamsInfo } from "../_utils/getContractFromParams";
import { getContractPageMetadata } from "../_utils/getContractPageMetadata";

export default async function Page(props: {
  params: {
    contractAddress: string;
    chain_id: string;
  };
}) {
  const info = await getContractPageParamsInfo(props.params);

  if (!info) {
    notFound();
  }

  const { functionSelectors } = await getContractPageMetadata(info.contract);

  return (
    <ContractSettingsPage
      contract={info.contract}
      isContractMetadataSupported={[
        isGetContractMetadataSupported(functionSelectors),
        isSetContractMetadataSupported(functionSelectors),
      ].every(Boolean)}
      isPrimarySaleSupported={[
        isPrimarySaleRecipientSupported(functionSelectors),
        isSetPrimarySaleRecipientSupported(functionSelectors),
      ].every(Boolean)}
      isRoyaltiesSupported={[
        isGetDefaultRoyaltyInfoSupported(functionSelectors),
        isSetDefaultRoyaltyInfoSupported(functionSelectors),
      ].every(Boolean)}
      isPlatformFeesSupported={[
        isGetPlatformFeeInfoSupported(functionSelectors),
        isSetPlatformFeeInfoSupported(functionSelectors),
      ].every(Boolean)}
    />
  );
}
