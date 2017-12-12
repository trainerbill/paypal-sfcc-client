import { getCurrentScript } from "./util";

const script: any = getCurrentScript();

if (script["data-mini-cart"]) {
    import(/* webpackChunkName: "minicart" */ "./minicart")
        .then(mcart => {
            
        })
        .catch(error => "An error occurred while loading the minicart component");
}
