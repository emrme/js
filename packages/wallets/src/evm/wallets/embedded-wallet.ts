import { EmbeddedWalletConnector } from "../connectors/embedded-wallet";
import {
  EmbeddedWalletAdditionalOptions,
  EmbeddedWalletConnectionArgs,
} from "../connectors/embedded-wallet/types";
import { walletIds } from "../constants/walletIds";
import { Connector } from "../interfaces/connector";
import { AbstractClientWallet, WalletOptions } from "./base";

export type EmbeddedWalletOptions =
  WalletOptions<EmbeddedWalletAdditionalOptions>;

export type { EmbeddedWalletAdditionalOptions } from "../connectors/embedded-wallet/types";

export class EmbeddedWallet extends AbstractClientWallet<
  EmbeddedWalletAdditionalOptions,
  EmbeddedWalletConnectionArgs
> {
  connector?: Connector;

  static id = walletIds.embeddedWallet;

  static meta = {
    name: "Embedded Wallet",
    iconURL:
      "ipfs://QmNx2evQa6tcQs9VTd3YaDm31ckfStvgRGKFGELahUmrbV/emailIcon.svg",
  };

  public get walletName() {
    return "Embedded Wallet" as const;
  }

  chain: EmbeddedWalletAdditionalOptions["chain"];

  constructor(options: EmbeddedWalletOptions) {
    super(EmbeddedWallet.id, {
      ...options,
    });

    this.chain = options.chain;
  }

  protected async getConnector(): Promise<Connector> {
    if (!this.connector) {
      this.connector = new EmbeddedWalletConnector({
        clientId: this.options?.clientId ?? "",
        chain: this.chain,
        chains: this.chains,
        styles: this.options?.styles,
      });
    }
    return this.connector;
  }

  async getEmail() {
    const connector = (await this.getConnector()) as EmbeddedWalletConnector;
    return connector.getEmail();
  }

  async getEmbeddedWalletSDK() {
    const connector = (await this.getConnector()) as EmbeddedWalletConnector;
    return connector.getEmbeddedWalletSDK();
  }
}