import axios from "axios";
import templates from "./templates";
import utils from "./utils";

import { ProductParams, ProductSellableParams } from "./types";

export namespace PromoStandards {
  /**
   * PromoStandards Services
   */
  type ServiceType =
    // | "Inventory"
    // | "Invoice"
    // | "MediaContent"
    // | "OrderShipmentNotification"
    // | "OrderStatus"
    "ProductData";
  // | "ProductPricingAndConfiguration"
  // | "PurchaseOrder";

  /**
   * Available PromoStandards Service Versions
   * @todo Validate version availability against Service Type
   */
  type ServiceVersion = "1.0.0" | "2.0.0";

  type ServiceEndpoint = {
    type: ServiceType;
    version: ServiceVersion;
    url: string; // @todo create a valid URL type
  };

  type ResponseFormat = "xml" | "json";

  type MethodType = "getProductSellable" | "getProduct";

  interface BaseAttributes {
    id?: string;
    password?: string;
    endpoints?: ServiceEndpoint[];
    format?: ResponseFormat;
  }

  export class Client {
    id?: string;
    password?: string;
    endpoints?: ServiceEndpoint[];
    format: ResponseFormat = "json";

    constructor(options: BaseAttributes) {
      this.id = options.id;
      this.password = options.password;
      this.endpoints = options.endpoints;
      this.format = options.format || this.format;
    }

    getEndpoint(service: ServiceType): ServiceEndpoint {
      let endpoint;
      if (this.endpoints && this.endpoints.length > 0) {
        endpoint = this.endpoints.find(
          (e) => e.type === service
        ) as ServiceEndpoint;

        if (endpoint) return endpoint;
      }

      throw new ReferenceError(`'${service}' endpoint is undefined`);
    }

    sendRequest<ParamType>(
      service: ServiceType,
      method: MethodType,
      params: ParamType
    ): any {
      const endpoint = this.getEndpoint(service);

      const soapTemplateIndex: {
        [index: string]: any;
      } = templates;

      const xml = soapTemplateIndex[method](
        Object.assign(
          {
            id: this.id,
            password: this.password,
            wsVersion: endpoint.version,
            majorVersion: utils.majorVersion(endpoint.version),
          },
          params
        )
      );

      return axios
        .post(endpoint.url, xml, {
          headers: {
            "Content-Type": "text/xml",
            SOAPAction: method,
          },
        })
        .then((result) => {
          if (this.format === "json") {
            return utils.convertXMLtoJSON(result.data);
          }

          return result;
        });
      //   .then((result: any) => {
      //     this.format === "json"
      //       ? resolve(Utils.convertXMLtoJSON(result.data))
      //       : resolve(result.data);
      //   })
      //   .catch((error: Error) => reject(error));

      //   return { endpoint, method, params, xml };

      //   return axios.post("");
    }

    readonly productData = {
      getProductSellable: (
        params: ProductSellableParams = { isSellable: true }
      ) =>
        this.sendRequest.bind(
          this,
          "ProductData",
          "getProductSellable",
          params
        )(),

      getProduct: (
        params: ProductParams = {
          localizationCountry: "US",
          localizationLanguage: "en",
        }
      ) => this.sendRequest.bind(this, "ProductData", "getProduct", params)(),
    };
  }
}
