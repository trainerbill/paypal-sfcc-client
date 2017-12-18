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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWluaWNhcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ0c7QUFFcEM7SUFPSTtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRiw4Q0FBYSxDQUFDLE1BQU0sQ0FBQztZQUVqQixHQUFHLEVBQUUsU0FBUztZQUNkLE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUssa0ZBQWtGO2FBQ2pHO1lBQ0QsT0FBTyxFQUFFLFVBQVMsSUFBUyxFQUFHLE9BQVk7Z0JBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDMUIsT0FBTyxFQUFFO3dCQUNMLFlBQVksRUFBRTs0QkFDVjtnQ0FDSSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7NkJBQzdDO3lCQUNKO3FCQUNKO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxXQUFXLEVBQUUsVUFBUyxJQUFTLEVBQUUsT0FBWTtnQkFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFZO29CQUNwQyw4Q0FBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyw4QkFBOEIsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1NBRUosRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFuQ00saUJBQVEsR0FBRyxnQkFBZ0IsQ0FBQztJQUM1Qix3QkFBZSxHQUFHLHVCQUF1QixDQUFDO0lBb0NyRCxlQUFDO0NBQUE7QUF2Q29CO0FBeUNyQiwrREFBZSxJQUFJLFFBQVEsRUFBRSxFQUFDIiwiZmlsZSI6Im1pbmljYXJ0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBheXBhbCBmcm9tIFwicGF5cGFsXCI7XG5pbXBvcnQgKiBhcyBjb29raWUgZnJvbSBcImpzLWNvb2tpZVwiO1xuXG5leHBvcnQgY2xhc3MgTWluaUNhcnQge1xuXG4gICAgc3RhdGljIHNlbGVjdG9yID0gXCJtaW5pLWNhcnQtc2xvdFwiO1xuICAgIHN0YXRpYyBwYXlwYWxDb250YWluZXIgPSBcIm1pbmktY2FydC1zbG90LXBheXBhbFwiO1xuXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlkID0gTWluaUNhcnQucGF5cGFsQ29udGFpbmVyO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE1pbmlDYXJ0LnNlbGVjdG9yKVswXS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgcGF5cGFsLkJ1dHRvbi5yZW5kZXIoe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnY6ICdzYW5kYm94JyxcbiAgICAgICAgICAgIGNsaWVudDoge1xuICAgICAgICAgICAgICAgIHNhbmRib3g6ICAgICdBWkR4akRTY0ZwUXRqV1RPVXRXS2J5Tl9iRHQ0T2dxYUY0ZVlYbGV3ZkJQNC04YXFYM1BpVjhlMUdXVTZsaUIyQ1VYbGtBNTlrSlhFN002UicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF5bWVudDogZnVuY3Rpb24oZGF0YTogYW55ICwgYWN0aW9uczogYW55KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnMucGF5bWVudC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBwYXltZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogeyB0b3RhbDogJzAuMDEnLCBjdXJyZW5jeTogJ1VTRCcgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQXV0aG9yaXplOiBmdW5jdGlvbihkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMucGF5bWVudC5nZXQoKS50aGVuKChwYXltZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29va2llLnNldChcInBheXBhbC1wYXltZW50XCIsIHBheW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiY2hlY2tvdXQ/cGF5cGFsZnJvbWNhcnQ9dHJ1ZVwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sICcjbWluaS1jYXJ0LXNsb3QtcGF5cGFsJyk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBNaW5pQ2FydCgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9taW5pY2FydC9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=