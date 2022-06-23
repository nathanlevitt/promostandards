import { PromoStandards } from "./PromoStandards";

// ETS
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

const ets = new PromoStandards.Client({
  id: "229317",
  password: "38596e94-a659-46e1-ac24-46390449992c",
  endpoints: [
    {
      type: "ProductData",
      version: "2.0.0",
      url: "https://pstnd.etsexpress.com/ProductDataServiceV2/CustomerProductDataService.svc",
    },
  ],
});

async function main() {
  const data = await ets.productData.getProduct({
    productId: "35441",
  });
  console.dir(data, { depth: null });
}

main();
