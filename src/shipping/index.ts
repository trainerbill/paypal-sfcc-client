import { getUrl } from "../util";
import * as cookie from "js-cookie";

export default class Shipping {

    static page = "shipping";
    static form = {
        firstName: "dwfrm_singleshipping_shippingAddress_addressFields_firstName",
        lastName: "dwfrm_singleshipping_shippingAddress_addressFields_lastName"
    };

    private paypalData: any;

    constructor() {
        console.info("Shipping Initialize");
        const data = cookie.get("paypal-payment");
        this.paypalData = JSON.parse(data || "");
        
        this.populateFields();

    }

    private populateFields() {
        for (const id in Shipping.form) {
            const ele = document.getElementById(id);
            if (ele) {
                (ele as HTMLInputElement).disabled = true;
                (ele as HTMLInputElement).value = this.map(id);
            } 
        }
    }

    map(dwid: string) {
        if ( dwid === "firstName") {
            return this.paypalData.payer.payer_info.first_name;
        } else if (dwid === "lastName") {
            return this.paypalData.payer.payer_info.last_name;
        }
    }

}