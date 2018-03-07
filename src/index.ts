import { getCurrentScript, getUrl } from "./util";
import Checkout from "./checkout";
import Payment from "./payment";
import Customer from "./customer";
import Cart from "./cart";
import ShopApi from "commercecloud-ocapi-client";
import * as cookie from "js-cookie";

export interface IConfiguration {
    clientid: string;
    hostname: string;
    minicart: {
        enabled: boolean,
    };
    site: string;
}

export default class SFCCPayPal {
    static script = getCurrentScript();
    static url = getUrl();
    static defaultConfig: IConfiguration = {
        clientid: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        hostname: SFCCPayPal.url.hostname,
        minicart: {
            enabled: true,
        },
        site: "SiteGenesis",
    }

    private config: IConfiguration;
    private dwsid: string;
    private dwsecuretoken: string;
    private jwt: string;
    public customer = new Customer();

    constructor(config: Partial<IConfiguration>) {
        this.config = { ...SFCCPayPal.defaultConfig, ...config };

        // Setup SFCC Client
        ShopApi.ApiClient.instance = new ShopApi.ApiClient({
            basePath: `https://${this.config.hostname}/s/${this.config.site}/dw/shop/v17_8`,
            enableCookies: true,
            defaultHeaders: {
                "x-dw-client-id": this.config.clientid,
            },
            // timeout: 60000,
        });
    }

    public async init() {
        try {
            await this.customer.init();

            if (this.config.minicart.enabled) {
                console.info("Importing MiniCart");
                import(/* webpackChunkName: "minicart" */ "./minicart")
                    .then(mcart => {
                        console.info("minicart: Imported");
                    })
                    .catch(error => "An error occurred while loading the minicart component");
            }

            const page = SFCCPayPal.url.pathname.split("/").pop();
            console.info("Page", page);
            console.info("URL", SFCCPayPal.url);
            console.info("Config", this.config);
            console.info("ClientID", this.config.clientid);
            
            if (page === Checkout.page) {
                new Checkout();
            } else if (page === Payment.page) {
                new Payment(this.customer);
            } else if (page === Cart.page) {
                new Cart(this.customer);
            }
        } catch (err) {

        }
    }

    

}
