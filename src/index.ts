import { getCurrentScript, getUrl } from "./util";
import Shipping from "./shipping";
import Checkout from "./checkout";
import Billing from "./billing";
import ShopApi from "commercecloud-ocapi-client";
import * as cookie from "js-cookie";

export interface IConfiguration {
    clientid: string;
    minicart: {
        enabled: boolean,
    };
}

export default class SFCCPayPal {
    static defaultConfig: IConfiguration = {
        clientid: "",
        minicart: {
            enabled: true,
        }
    }
    static shipping = Shipping;

    private config: IConfiguration;
    private script: any = getCurrentScript();
    private url: any = getUrl();
    private dwsid: string;
    private dwsecuretoken: string;
    private jwt: string;
    private customerid: string;
    private hostname = this.url.hostname;

    constructor(config: Partial<IConfiguration>) {
        this.config = { ...SFCCPayPal.defaultConfig, ...config };

        if (this.config.minicart.enabled) {
            console.info("Importing MiniCart");
            import(/* webpackChunkName: "minicart" */ "./minicart")
                .then(mcart => {
                    console.info("minicart: Imported");
                })
                .catch(error => "An error occurred while loading the minicart component");
        }

        const page = this.url.pathname.split("/").pop();
        console.info("Page", page);
        console.info("URL", this.url);
        
        if (page === Shipping.page) {
            new Shipping();
        } else if (page === Checkout.page) {
            new Checkout();
        } else if (page === Billing.page) {
            new Billing();
        }
    
        // Setup SFCC Client
        ShopApi.ApiClient.instance = new ShopApi.ApiClient({
            basePath: `https://${this.hostname}/dw/shop/v17_8`,
            // enableCookies: true,
            defaultHeaders: {
                "x-dw-client-id": this.config.clientid,
            },
            // timeout: 60000,
        });

        this.getJWT();

    }

    getJWT() {
        const api = new ShopApi.CustomersApi();
        console.log("Requesting JWT");
        // api.apiClient.defaultHeaders["Cookie"] = "dwsid=z8TJ6ZLbSW5XkOmu3_QTebi9B4GQq-I18vIWGQ0Tm5tXTse9sIrIhtAMdt3NgrDEoozc2s3suPjPy2Rc4orvsw==;dwsecuretoken_1f866598df3d23bd96d7fbc0ff91985f=YRTPw2Me5aoVnlZyV2ApO-tpp2ZwFZDmng==;"
        api.postCustomersAuth({
            type: "session",
          })
            .then((data: any) => {
                // tslint:disable-next-line:no-console
                console.log(data);
                this.customerid = data.customer_id;
        
            })
            .catch((fault: any) => {
                // tslint:disable-next-line:no-console
                console.error(fault);
            });
    }

}
