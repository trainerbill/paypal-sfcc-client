import { getCurrentScript } from "./util";

const script: any = getCurrentScript();
console.info("script is", script["data-mini-cart"]);
if (script["data-mini-cart"] !== null) {
    console.info("Importing MiniCart");
    import(/* webpackChunkName: "minicart" */ "./minicart")
        .then(mcart => {
            console.info("minicart: Imported");
        })
        .catch(error => "An error occurred while loading the minicart component");
}
