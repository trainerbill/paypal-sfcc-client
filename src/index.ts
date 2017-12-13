import { getCurrentScript } from "./util";

const script: any = getCurrentScript();

if (script["data-mini-cart"]) {
    import(/* webpackChunkName: "minicart" */ "./minicart")
        .then(mcart => {
            console.info("minicart: Imported");
        })
        .catch(error => "An error occurred while loading the minicart component");
}
