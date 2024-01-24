export enum MixerType {
  FLOAT = "standard",
  FIXED = "fixed-rate",
}

// export enum ChainType {
//   ETH = "ethereum",
//   BNB = "binance",
//   ARB = "arbitrum",
//   TRX = "tron",
//   SOL = "solana",
//   OP = "optimism",
// }

// export interface ChainTicker {
//   name: string;
//   image: string;
// }

export interface SelectMixerParams {
  curr: string;
  network: string;
  name: string;
  imageUrl: string;
  supportsFixedRate: boolean;
}

export interface MixerState {
  currency: string;
  name: string;
  amount: string;
  network: string;
  imageUrl: string;
  supportsFixedRate: boolean;
}

export interface Token {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  network: string;
  tokenContract: any;
  buy: boolean;
  sell: boolean;
  legacyTicker: string;
}

export interface EstimateExchange {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  fromNetwork: string;
  toNetwork: string;
  flowType: MixerType;
}

export interface AddressValidationParams {
  network: string;
  address: string;
}

export interface CreateExchangeDto {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  fromAmount: string;
  toAmount: string;
  address: string;
  flow: string;
  type: string;
  rateId: string;
}

export interface CreateExchangeResponse {
  fromAmount: number;
  toAmount: number;
  flow: string;
  type: string;
  payinAddress: string;
  payoutAddress: string;
  payinExtraId: string;
  fromCurrency: string;
  toCurrency: string;
  validUntil: string;
  id: string;
  payinExtraIdName: string;
  fromNetwork: string;
  toNetwork: string;
}

export interface StatusExchangeResponse {
  id: string;
  status: string;
  actionsAvailable: boolean;
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  expectedAmountFrom: number;
  expectedAmountTo: number;
  amountFrom: any;
  amountTo: any;
  payinAddress: string;
  payoutAddress: string;
  payinExtraId: any;
  payoutExtraId: any;
  refundAddress: any;
  refundExtraId: any;
  createdAt: string;
  updatedAt: string;
  validUntil: string;
  depositReceivedAt: any;
  payinHash: any;
  payoutHash: any;
  fromLegacyTicker: string;
  toLegacyTicker: string;
  refundHash: any;
  refundAmount: any;
  userId: any;
}
