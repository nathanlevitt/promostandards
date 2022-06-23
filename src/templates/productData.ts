import pug from "pug";

import builder from "xmlbuilder";
import { ProductSellableParams } from "../types";

// const getProductSellable: (params: ProductSellableParams) => string = (
//   params
// ) => {
//   const xml = builder.begin();
//   const envelope = xml.ele("Envelope", {
//     xmlns: "http://schemas.xmlsoap.org/soap/envelope/",
//   });
//   const body = envelope.ele("Body");
//   const request = body.ele("GetProductSellableRequest", {
//     // "xmlns:xsi=": "http://www.w3.org/2001/XMLSchema-instance",
//     xmlns: "http://www.promostandards.org/WSDL/ProductDataService/2.0.0/", // @todo Replace with major version
//   });
//   request.ele(
//     "wsVersion",
//     {
//       xmlns:
//         "http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/",
//     },
//     "2.0.0"
//   );

//   // Params
//   if (params.productId) {
//     request.ele(
//       "id",
//       {
//         xmlns:
//           "http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/",
//       },
//       "webdev23"
//     );
//   }

//   // <GetProductSellableRequest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.promostandards.org/WSDL/ProductDataService/2.0.0/">
//   //   <wsVersion xmlns="http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/">2.0.0</wsVersion>
//   //   <id xmlns="http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/">webdev23</id>
//   //   <password xmlns="http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/">!falkMUFqh$431y</password>
//   //   <isSellable xmlns="http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/">true</isSellable>
//   // </GetProductSellableRequest>

//   return xml.end({ pretty: true });
// };

const getProductSellable: pug.compileTemplate = pug.compile(
  `soapenv:Envelope(
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns="http://www.promostandards.org/WSDL/ProductDataService/" + majorVersion + "/"
    xmlns:shar="http://www.promostandards.org/WSDL/ProductDataService/" + majorVersion + "/SharedObjects/"
  )
  soapenv:Header/
  soapenv:Body
    ns:GetProductSellableRequest
      shar:wsVersion #{wsVersion}
      shar:id #{id}
      if password
        shar:password #{password}
      if productId
        shar:productId #{productId}
      if partId
        shar:partId #{partId}
      shar:isSellable #{isSellable}`
);

const getProduct: pug.compileTemplate = pug.compile(
  `soapenv:Envelope(
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns="http://www.promostandards.org/WSDL/ProductDataService/" + majorVersion + "/"
    xmlns:shar="http://www.promostandards.org/WSDL/ProductDataService/" + majorVersion + "/SharedObjects/"
  )
  soapenv:Header/
  soapenv:Body
    ns:GetProductRequest
      shar:wsVersion #{wsVersion}
      shar:id #{id}
      if password
        shar:password #{password}
      shar:localizationCountry #{localizationCountry}
      shar:localizationLanguage #{localizationLanguage}
      shar:productId #{productId}
      if partId
        shar:partId #{partId}
      if colorName
        shar:colorName #{colorName}`
);

export = {
  getProductSellable,
  getProduct,
};
