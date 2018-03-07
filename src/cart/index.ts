import { get } from "lodash";
import * as paypal from "paypal";
import * as $ from "jquery";
import ShopApi from "commercecloud-ocapi-client";
import Customer from "../customer";


export default class Cart {

    static page = "cart";
    static formid = "dwfrm_login";
    static selector = ".totals"

    private paypalData: any;
    private form: HTMLFormElement;
    private accessToken: any;

    constructor(
        private customer: Customer
    ) {
        console.info("Cart Initialize", $);
        // this.getAccessToken();
        this.createButton();
    }
    /*
    private async getAccessToken() {
        this.accessToken = await paypal.request.post(`https://api.sandbox.paypal.com/v1/oauth2/token`, {
            grant_type: "client_credentials"
        }, {
            headers: {
                "Accept": "application/json",
                "Accept-Language": "en_US",
                "Authorization": `Basic ${window.btoa("AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R")}`
            }
        });
    }
    */
    public render(domid: string) {
        paypal.Button.render({
            env: 'sandbox',
            client: {
                sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            },
            payment: (data: any , actions: any) => {
                return actions.payment.create({
                    payment: {
                        intent: "order",
                        transactions: [
                            {
                                amount: { total: this.customer.basket.order_total, currency: this.customer.basket.currency }
                            }
                        ]
                    }
                });
            },
            onAuthorize: (data: any, actions: any) => {
                /*
                paypal.request.addHeaderBuilder(() => {
                    return {
                        "Authorization": `Bearer ${this.accessToken.access_token}`
                    }
                });
                const order = await paypal.request.post(`https://api.sandbox.paypal.com/v1/payments/payment/${data.paymentID}/execute`, null, {
                    json: {
                        payer_id: data.payerID,
                    }
                });
                const orderid = get(order, "transactions[0].related_resources[0].order.id");
                paypal.request.addHeaderBuilder(() => {
                    return {
                        "Authorization": `Bearer ${this.accessToken.access_token}`
                    }
                });
                await paypal.request.post(`https://api.sandbox.paypal.com/v1/payments/orders/${orderid}/authorize`, null, {
                    json: {
                        amount: {
                            total: get(order, "transactions[0].amount.total"),
                            currency: get(order, "transactions[0].amount.currency")
                        }
                    }
                });
                */
                return actions
                        .payment
                        .get()
                        .then((payment: any) => this.setBillingAddress(payment))
                        .then((payment: any) => this.setShippingAddress(payment))
                        .then((payment: any) => this.setPaymentInstrument(payment))
                        .then(() => {
                            window.location.href = "/on/demandware.store/Sites-SiteGenesis-Site/en_US/Checkout-Begin?stage=payment#payment";
                        });
            },
            onError: (err: any) => console.error(err),

        }, domid);
    }

    private createButton() {
        // Clone checkout button
        const paypalButton = $(".checkout-continue").clone();
        paypalButton.first().empty();
        paypalButton.first().attr("id", "paypal-test");
        $(".checkout-continue").parent().append(paypalButton);
        this.render("#paypal-test");
    }

    private async setPaymentInstrument(data: any) {
        const instruments = get(this.customer, "basket.payment_instruments");
        if (instruments && instruments.length) {
            const instrument = this.customer.basket.payment_instruments.filter((ins: any) => ins.payment_method_id === "PAYPAL");
            if (instrument.length) {
                return await this.updatePaymentInstrument(data, instrument[0]);
            }
        }
        return await this.createPaymentInstrument(data);
    }

    private async createPaymentInstrument(data: any) {
        const api = new ShopApi.BasketsApi();
        const payerInfo = get(data, "payer.payer_info");
        this.customer.basket = await api.postBasketsByIDPaymentInstruments(this.customer.basket.basket_id, this.mapInstrument(data));
        return data;
    }

    private async updatePaymentInstrument(data: any, instrument: any) {
        const api = new ShopApi.BasketsApi();
        const payerInfo = get(data, "payer.payer_info");
        this.customer.basket = await api.patchBasketsByIDPaymentInstrumentsByID(
            this.customer.basket.basket_id,
            instrument.payment_instrument_id,
            this.mapInstrument(data)
        );
        return data;
    }

    private async setBillingAddress(data: any) {
        const api = new ShopApi.BasketsApi();
        const billingAddress = get(data, "payer.payer_info.billing_address");
        if (billingAddress) {
            this.customer.basket = await api.putBasketsByIDBillingAddress(this.customer.basket.basket_id, {
                body: {
                    address1: billingAddress.line1,
                    address2: billingAddress.line2,
                    city: billingAddress.city,
                    state_code : billingAddress.state,
                    country_code: billingAddress.country_code.toLowerCase(),
                    postal_code: billingAddress.postal_code,
                    first_name: data.payer.payer_info.first_name,
                    last_name: data.payer.payer_info.last_name,
                },
            });
        }
        return data;
    }

    private async setShippingAddress(data: any) {
        const api = new ShopApi.BasketsApi();
        const shippingAddress = get(data, "payer.payer_info.shipping_address");
        if (shippingAddress) {
            const promises = this.customer.basket.shipments.map((shipment: any) => {
                return api.patchBasketsByIDShipmentsByID(this.customer.basket.basket_id, shipment.shipment_id, {
                    shipping_address: {
                        address1: shippingAddress.line1,
                        address2: shippingAddress.line2,
                        city: shippingAddress.city,
                        state_code : shippingAddress.state,
                        country_code: shippingAddress.country_code.toLowerCase(),
                        postal_code: shippingAddress.postal_code,
                        first_name: data.payer.payer_info.first_name,
                        last_name: data.payer.payer_info.last_name,
                        phone: data.payer.payer_info.phone,
                    }
                });
            });
            const result = await Promise.all(promises);
            this.customer.basket = result[0];
        }
        return data;
    }

    private mapInstrument(paypalData: any) {
        const payerInfo = get(paypalData, "payer.payer_info");
        return {
            amount: parseFloat(get(paypalData, "transactions[0].amount.total")),
            payment_method_id: "PAYPAL",
            c_paypal_email: payerInfo.email,
            c_paypal_payer_id: payerInfo.payer_id,
            c_paypal_pay_id: paypalData.id,
            c_paypal_account_status: paypalData.payer.status,
        }
    }
}