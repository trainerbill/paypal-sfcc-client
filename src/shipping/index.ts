import { getUrl } from "../util";
import * as cookie from "js-cookie";
import { get, set } from "lodash";

export default class Shipping {

    static page = "shipping";
    static form = new Map([
        ['firstName', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_firstName",
            pp: "payer.payer_info.first_name",
        }],
        ['lastName', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_lastName",
            pp: "payer.payer_info.last_name",
        }],
        ['line1', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_address1",
            pp: "payer.payer_info.shipping_address.line1",
        }],
        ['line2', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_address2",
            pp: "payer.payer_info.shipping_address.line2",
        }],
        ['city', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_city",
            pp: "payer.payer_info.shipping_address.city",
        }],
        ['state', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_states_state",
            pp: "payer.payer_info.shipping_address.state",
        }],
        ['zip', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_postal",
            pp: "payer.payer_info.shipping_address.postal_code",
        }],
        ['country', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_country",
            pp: "payer.payer_info.shipping_address.country_code",
        }],
        ['phone', {
            dw: "dwfrm_singleshipping_shippingAddress_addressFields_phone",
            pp: "payer.payer_info.phone",
        }],
    ]);

    private paypalData: any;

    constructor() {
        console.info("Shipping Initialize");
        const data = cookie.get("paypal-payment");
        if (data) {
            this.paypalData = JSON.parse(data || "");
            
            // Lowercase country
            const country = get(this.paypalData, (Shipping.form.get("country") as any).pp);
            set(this.paypalData, (Shipping.form.get("country") as any).pp, country.toLowerCase());
            
            
            this.populateFields();
        }

    }

    private populateFields() {
        Shipping.form.forEach((data) => {
            const ele = document.getElementById(data.dw);
            if (ele) {
                const value = get(this.paypalData, data.pp);
                if (value) {
                    (ele as HTMLInputElement).disabled = true;
                    (ele as HTMLInputElement).value = value;
                }
            } 
        });
    }

}