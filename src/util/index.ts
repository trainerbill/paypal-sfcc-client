import * as urlparse from "url-parse";

export function getCurrentScript() {
    return document.currentScript ||  document.getElementById("paypal-sfcc-client")
}

export function getUrl() : any {
    return urlparse(window.location.href);
}

export default {
    
}