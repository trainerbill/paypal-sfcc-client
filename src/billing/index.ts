import { getUrl } from "../util";
import * as cookie from "js-cookie";
import { get, set } from "lodash";

export default class Billing {

    static page = "COShipping-SingleShipping";
    static form = new Map([
        ['firstName', {
            dw: "dwfrm_billing_billingAddress_addressFields_firstName",
            pp: "payer.payer_info.first_name",
        }],
        ['lastName', {
            dw: "dwfrm_billing_billingAddress_addressFields_lastName",
            pp: "payer.payer_info.last_name",
        }],
        ['line1', {
            dw: "dwfrm_billing_billingAddress_addressFields_address1",
            pp: "payer.payer_info.billing_address.line1",
        }],
        ['line2', {
            dw: "dwfrm_billing_billingAddress_addressFields_address2",
            pp: "payer.payer_info.billing_address.line2",
        }],
        ['city', {
            dw: "dwfrm_billing_billingAddress_addressFields_city",
            pp: "payer.payer_info.billing_address.city",
        }],
        ['state', {
            dw: "dwfrm_billing_billingAddress_addressFields_states_state",
            pp: "payer.payer_info.billing_address.state",
        }],
        ['zip', {
            dw: "dwfrm_billing_billingAddress_addressFields_postal",
            pp: "payer.payer_info.billing_address.postal_code",
        }],
        ['country', {
            dw: "dwfrm_billing_billingAddress_addressFields_country",
            pp: "payer.payer_info.billing_address.country_code",
        }],
        ['phone', {
            dw: "dwfrm_billing_billingAddress_addressFields_phone",
            pp: "payer.payer_info.phone",
        }],
        ['email', {
            dw: "dwfrm_billing_billingAddress_email_emailAddress",
            pp: "payer.payer_info.email",
        }],
    ]);

    private paypalData: any;

    constructor() {
        console.info("Billing Initialize");
        const data = cookie.get("paypal-payment");
        if (data) {
            this.paypalData = JSON.parse(data || "");
            
            // Lowercase country
            const country = get(this.paypalData, (Billing.form.get("country") as any).pp);
            set(this.paypalData, (Billing.form.get("country") as any).pp, country.toLowerCase());
            
            
            this.populateFields();
        }

    }

    private populateFields() {
        Billing.form.forEach((data) => {
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