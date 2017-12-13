import { getUrl } from "../util";
import * as cookie from "js-cookie";

export default class Shipping {

    static page = "shipping";
    static form = {
        firstName: "dwfrm_singleshipping_shippingAddress_addressFields_firstName",
        lastName: "dwfrm_singleshipping_shippingAddress_addressFields_lastName",
        line1: "dwfrm_singleshipping_shippingAddress_addressFields_address1",
        line2: "dwfrm_singleshipping_shippingAddress_addressFields_address2",
        city: "dwfrm_singleshipping_shippingAddress_addressFields_city",
        state: "dwfrm_singleshipping_shippingAddress_addressFields_states_state",
        zip: "dwfrm_singleshipping_shippingAddress_addressFields_postal",
        country: "dwfrm_singleshipping_shippingAddress_addressFields_country",
        phone: "dwfrm_singleshipping_shippingAddress_addressFields_phone"
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
            const ele = document.getElementById((Shipping.form as any)[id]);
            if (ele) {
                const mapValue = this.map(id);
                if (mapValue) {
                    (ele as HTMLInputElement).disabled = true;
                    (ele as HTMLInputElement).value = mapValue;
                }
            } 
        }
    }

    map(dwid: string) {
        if ( dwid === "firstName") {
            return this.paypalData.payer.payer_info.first_name;
        } else if (dwid === "lastName") {
            return this.paypalData.payer.payer_info.last_name;
        } else if (dwid === "line1") {
            return this.paypalData.payer.payer_info.shipping_address.line1;
        } else if (dwid === "line2") {
            return this.paypalData.payer.payer_info.shipping_address.line2;
        } else if (dwid === "city") {
            return this.paypalData.payer.payer_info.shipping_address.city;
        } else if (dwid === "state") {
            return this.paypalData.payer.payer_info.shipping_address.state;
        } else if (dwid === "zip") {
            return this.paypalData.payer.payer_info.shipping_address.postal_code;
        } else if (dwid === "country") {
            return this.paypalData.payer.payer_info.shipping_address.country_code.toLowerCase();
        } else if (dwid === "phone") {
            return this.paypalData.payer.payer_info.phone;
        }
    }

}