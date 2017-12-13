import * as cookie from "js-cookie";
import { get } from "lodash";

export default class Checkout {

    static page = "checkout";
    static formid = "dwfrm_login";

    private paypalData: any;
    private form: HTMLFormElement;

    constructor() {
        console.info("Checkout Initialize");
        const data = cookie.get("paypal-payment");
        this.form = <HTMLFormElement>document.getElementById(Checkout.formid);
        if (data) {
            this.paypalData = JSON.parse(data || "");
            this.form.getElementsByTagName("input")[0].value = this.paypalData.payer.payer_info.email;
        }
        
    }

}