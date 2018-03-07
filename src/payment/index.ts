import { getUrl } from "../util";
import * as cookie from "js-cookie";
import { get, set } from "lodash";
import PayPalLogo from "./logo.html";
import Customer from "../customer";
import * as $ from "jquery";

export default class Payment {

    static page = "Checkout-Begin";
    static selector = "#dwfrm_billing";

    private fieldset: any;

    constructor(private customer: Customer) {
        console.info("Payment Initialize");
        this.fieldset = $(Payment.selector).children("fieldset").last();
        this.createPayPalTab();
        this.createPayPalTabContent();
        this.init();
    }

    private async init() {
        console.info("Payment Initialize");
    }

    private createPayPalTab() {
        const paymentOptions = this.fieldset.find(".payment-options");
        const paypalOption = paymentOptions.find("li").first().clone();

        paymentOptions.find(".nav-item").each((i: any, ele: any) => {
            $(ele).hide();
        });
        
        
        paypalOption.attr("data-method-id", "PAYPAL");
        paypalOption.attr("id", "paypal-method-tab");
        paypalOption.find("a").removeClass("active");
        paypalOption.find("a").attr("href", "#paypal-content");
        paypalOption.find("img").attr("src", "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg");
        paymentOptions.append(paypalOption);
    }
    
    private createPayPalTabContent() {
        const paypalTabContent = this.fieldset.find("#credit-card-content").clone();
        paypalTabContent.attr("id", "paypal-content");
        paypalTabContent.find("fieldset").remove();
        paypalTabContent.find("input").attr("value", "PAYPAL");
        paypalTabContent.removeClass("active credit-card-content");
        this.fieldset.find(".tab-content").append(paypalTabContent);

        if (this.hasPaypalInstrument()) {
            const paypalInstrument = this.customer.basket.payment_instruments.filter((ins: any) => ins.payment_method_id === "PAYPAL");
            if (paypalInstrument.length) {
                $(PayPalLogo).appendTo("#paypal-content");
                $("#paypal-logo-email").html(paypalInstrument[0].c_paypal_email);
            }
            this.triggerPaypal();
        }
    }

    private triggerPaypal() {
        this.fieldset.find("#paypal-method-tab > a").trigger("click");
        this.fieldset.find(".payment-information").attr("data-payment-method-id", "PAYPAL");
        this.fieldset.find("fieldset.credit-card-form").find("input, select").each((i: any, ele: any) => {
            $(ele).attr("disabled", "disabled");
        });
    }

    private hasPaypalInstrument() {
        const instruments = get(this.customer.basket, "payment_instruments");
        const paypalInstruments = instruments.filter((ins: any) => ins.payment_method_id === "PAYPAL");
        return paypalInstruments.length === 0 ? false : true;
    }
}