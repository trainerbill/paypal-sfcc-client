import { getCurrentScript, getUrl } from "./util";
import Shipping from "./shipping";

const script: any = getCurrentScript();
const url: any = getUrl();

if (script["data-mini-cart"] !== null) {
    console.info("Importing MiniCart");
    import(/* webpackChunkName: "minicart" */ "./minicart")
        .then(mcart => {
            console.info("minicart: Imported");
        })
        .catch(error => "An error occurred while loading the minicart component");
}

const page = url.pathname.split("/").pop();
console.info("Page", page);

if (page === "shipping") {
    new Shipping();
}