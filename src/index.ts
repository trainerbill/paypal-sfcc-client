import { getCurrentScript, getUrl } from "./util";
import Shipping from "./shipping";
import Checkout from "./checkout";
import Billing from "./billing";
import * as ShopApi from "commercecloud-ocapi-client";
import * as cookie from "js-cookie";

export interface IConfiguration {
    clientid: string;
    hostname: string;
    minicart: {
        enabled: boolean,
    };
}

export default class SFCCPayPal {
    static defaultConfig: IConfiguration = {
        clientid: "",
        hostname: "localhost",
        minicart: {
            enabled: true,
        }
    }
    static shipping = Shipping;

    private config: IConfiguration;
    private script: any = getCurrentScript();
    private url: any = getUrl();

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
        
        if (page === Shipping.page) {
            new Shipping();
        } else if (page === Checkout.page) {
            new Checkout();
        } else if (page === Billing.page) {
            new Billing();
        }
        console.log(ShopApi);
        // Setup SFCC Client
        ShopApi.ApiClient.instance = new ShopApi.ApiClient({
            basePath: `https://${this.config.hostname}/dw/shop/v17_8`,
            // enableCookies: true,
            defaultHeaders: {
                "x-dw-client-id": this.config.clientid,
            },
            // timeout: 60000,
        });

        this.getSfccCookies();

    }

    getJWT() {
        const api = new ShopApi.CustomersApi();
        api.apiClient.defaultHeaders["Cookie"] = "dwsid=z8TJ6ZLbSW5XkOmu3_QTebi9B4GQq-I18vIWGQ0Tm5tXTse9sIrIhtAMdt3NgrDEoozc2s3suPjPy2Rc4orvsw==;dwsecuretoken_1f866598df3d23bd96d7fbc0ff91985f=YRTPw2Me5aoVnlZyV2ApO-tpp2ZwFZDmng==;"
        api.postCustomersAuth({
            type: "session",
          })
            .then((data: any) => {
                // tslint:disable-next-line:no-console
                console.log(api);
        
            })
            .catch((fault: any) => {
                // tslint:disable-next-line:no-console
                console.error(fault);
            });
    }

    getSfccCookies() {

        const cookies = cookie.get();
        console.log(cookies);

    }

}
