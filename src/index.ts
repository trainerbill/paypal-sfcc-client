import { getCurrentScript, getUrl } from "./util";
import Shipping from "./shipping";

export default class SFCCPayPal {

    private script: any = getCurrentScript();
    private url: any = getUrl();

    constructor(config: any = {}) {

        if (this.script["data-mini-cart"] !== null) {
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
        }

    }

}
