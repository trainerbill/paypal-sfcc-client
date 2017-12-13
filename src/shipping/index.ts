import { getUrl } from "../util";
import * as cookie from "js-cookie";

export default class Shipping {

    static page = "shipping";
    static form = {
        firstName: "dwfrm_singleshipping_shippingAddress_addressFields_firstName"
    };

    private paypalData: any;

    constructor() {
        this.paypalData = cookie.get("paypal-payment");
        // document.getElementById(Shipping.form.firstName).value = this.paypalData.

    }

}