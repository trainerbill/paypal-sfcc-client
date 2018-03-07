import * as paypal from "paypal";
import * as cookie from "js-cookie";

export class MiniCart {

    static bagSelector = "div.mini-cart";
    static selector = "div.mini-cart";
    static paypalContainer = "#mini-cart-paypal";

    private container: HTMLElement;

    constructor() {
        console.info("Minicart constructor");
        
        
        
    }

    private waitForDom() {
        let i = 0;
        const timer = setInterval(() => {
            console.info("waiting for DOM");
            if (i > 60) {
                this.stopTimer(timer);
            }
            const ele = document.querySelector(MiniCart.selector);
            if (ele) {
                console.info("Appending to", ele);
                ele.appendChild(this.container);
                this.stopTimer(timer);
            }
            i++;
        }, 10);
    }

    private stopTimer(timer: any) {
        clearInterval(timer);
    }

    private createButton() {
        this.container = document.createElement("div");
        this.container.className = "popover-bottom";
        
        paypal.Button.render({
            
            env: 'sandbox',
            client: {
                sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            },
            payment: function(data: any , actions: any) {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: '0.01', currency: 'USD' }
                            }
                        ]
                    }
                });
            },
            onAuthorize: function(data: any, actions: any) {
                actions.payment.get().then((payment: any) => {
                    cookie.set("paypal-payment", payment);
                    window.location.href = "checkout?paypalfromcart=true";
                });
            }

        }, this.container);
    }

}

export default new MiniCart();
