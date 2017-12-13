import { getCurrentScript, getUrl } from "./util";
import Shipping from "./shipping";
import Checkout from "./checkout";

export interface IConfiguration {
    minicart: {
        enabled: boolean,
    }
}

export default class SFCCPayPal {
    static defaultConfig: IConfiguration = {
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
        
        if (page === "shipping") {
            new Shipping();
        } else if (page === "checkout") {
            new Checkout();
        }

    }

}
