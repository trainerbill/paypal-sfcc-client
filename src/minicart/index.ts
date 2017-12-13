import * as paypal from "paypal";
import * as cookie from "js-cookie";

export class MiniCart {

    static selector = "mini-cart-slot";
    static paypalContainer = "mini-cart-slot-paypal";

    private container: HTMLElement;

    constructor() {
        this.container = document.createElement("span");
        this.container.id = MiniCart.paypalContainer;
        document.getElementsByClassName(MiniCart.selector)[0].appendChild(this.container);

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
                cookie.set("cart-data", data);
                window.location.href = "checkout?paypalfromcart=true";
            }

        }, '#mini-cart-slot-paypal');
    }

}

export default new MiniCart();