export type ProductSellableParams = {
  productId?: string;
  partId?: string;
  isSellable?: boolean;
};

export type ProductParams = {
  productId?: string;
  partId?: string;
  localizationCountry?: "US" | "CA";
  localizationLanguage?: "en" | "fr";
};
