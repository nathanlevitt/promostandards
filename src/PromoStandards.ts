const axios = require("axios");

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

  type MethodType = "getProductSellable";

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

    sendRequest(service: ServiceType, method: MethodType, params: any): any {
      const endpoint = this.getEndpoint(service);

      return endpoint;

      //   return axios.post("");
    }

    readonly productData = {
      getProductSellable: this.sendRequest.bind(
        this,
        "ProductData",
        "getProductSellable"
      ),
    };
  }
}
