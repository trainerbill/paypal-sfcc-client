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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWluaWNhcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ0c7QUFFcEM7SUFPSTtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRiw4Q0FBYSxDQUFDLE1BQU0sQ0FBQztZQUVqQixHQUFHLEVBQUUsU0FBUztZQUNkLE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUssa0ZBQWtGO2FBQ2pHO1lBQ0QsT0FBTyxFQUFFLFVBQVMsSUFBUyxFQUFHLE9BQVk7Z0JBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDMUIsT0FBTyxFQUFFO3dCQUNMLFlBQVksRUFBRTs0QkFDVjtnQ0FDSSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7NkJBQzdDO3lCQUNKO3FCQUNKO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxXQUFXLEVBQUUsVUFBUyxJQUFTLEVBQUUsT0FBWTtnQkFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFZO29CQUNwQyw4Q0FBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyw4QkFBOEIsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1NBRUosRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFuQ00saUJBQVEsR0FBRyxnQkFBZ0IsQ0FBQztJQUM1Qix3QkFBZSxHQUFHLHVCQUF1QixDQUFDO0lBb0NyRCxlQUFDO0NBQUE7QUF2Q29CO0FBeUNyQiwrREFBZSxJQUFJLFFBQVEsRUFBRSxFQUFDIiwiZmlsZSI6Im1pbmljYXJ0LnBwc2ZjYy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXlwYWwgZnJvbSBcInBheXBhbFwiO1xuaW1wb3J0ICogYXMgY29va2llIGZyb20gXCJqcy1jb29raWVcIjtcblxuZXhwb3J0IGNsYXNzIE1pbmlDYXJ0IHtcblxuICAgIHN0YXRpYyBzZWxlY3RvciA9IFwibWluaS1jYXJ0LXNsb3RcIjtcbiAgICBzdGF0aWMgcGF5cGFsQ29udGFpbmVyID0gXCJtaW5pLWNhcnQtc2xvdC1wYXlwYWxcIjtcblxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pZCA9IE1pbmlDYXJ0LnBheXBhbENvbnRhaW5lcjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShNaW5pQ2FydC5zZWxlY3RvcilbMF0uYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHBheXBhbC5CdXR0b24ucmVuZGVyKHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW52OiAnc2FuZGJveCcsXG4gICAgICAgICAgICBjbGllbnQ6IHtcbiAgICAgICAgICAgICAgICBzYW5kYm94OiAgICAnQVpEeGpEU2NGcFF0aldUT1V0V0tieU5fYkR0NE9ncWFGNGVZWGxld2ZCUDQtOGFxWDNQaVY4ZTFHV1U2bGlCMkNVWGxrQTU5a0pYRTdNNlInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBheW1lbnQ6IGZ1bmN0aW9uKGRhdGE6IGFueSAsIGFjdGlvbnM6IGFueSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zLnBheW1lbnQuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bWVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IHsgdG90YWw6ICcwLjAxJywgY3VycmVuY3k6ICdVU0QnIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkF1dGhvcml6ZTogZnVuY3Rpb24oZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnBheW1lbnQuZ2V0KCkudGhlbigocGF5bWVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZS5zZXQoXCJwYXlwYWwtcGF5bWVudFwiLCBwYXltZW50KTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImNoZWNrb3V0P3BheXBhbGZyb21jYXJ0PXRydWVcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCAnI21pbmktY2FydC1zbG90LXBheXBhbCcpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTWluaUNhcnQoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWluaWNhcnQvaW5kZXgudHMiXSwic291cmNlUm9vdCI6IiJ9