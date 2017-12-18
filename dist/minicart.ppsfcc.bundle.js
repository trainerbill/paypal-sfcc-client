webpackJsonpSFCCPayPal([0],{

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiniCart", function() { return MiniCart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_paypal__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_paypal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_paypal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_cookie__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_cookie__);


var MiniCart = /** @class */ (function () {
    function MiniCart() {
        this.container = document.createElement("span");
        this.container.id = MiniCart.paypalContainer;
        document.getElementsByClassName(MiniCart.selector)[0].appendChild(this.container);
        __WEBPACK_IMPORTED_MODULE_0_paypal__["Button"].render({
            env: 'sandbox',
            client: {
                sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            },
            payment: function (data, actions) {
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
            onAuthorize: function (data, actions) {
                actions.payment.get().then(function (payment) {
                    __WEBPACK_IMPORTED_MODULE_1_js_cookie__["set"]("paypal-payment", payment);
                    window.location.href = "checkout?paypalfromcart=true";
                });
            }
        }, '#mini-cart-slot-paypal');
    }
    MiniCart.selector = "mini-cart-slot";
    MiniCart.paypalContainer = "mini-cart-slot-paypal";
    return MiniCart;
}());

/* harmony default export */ __webpack_exports__["default"] = (new MiniCart());


/***/ })

});