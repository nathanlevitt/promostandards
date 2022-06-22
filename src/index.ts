import { PromoStandards } from "./PromoStandards";

// SanMar
const supplier = new PromoStandards.Client({
  id: "webdev23",
  password: "!falkMUFqh$431y",
  endpoints: [
    {
      type: "ProductData",
      version: "2.0.0",
      url: "https://ws.sanmar.com:8080/promostandards/ProductDataServiceBindingV2?WSDL",
    },
  ],
});

console.log(supplier.productData.getProductSellable({}));
