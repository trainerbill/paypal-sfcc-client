import ShopApi from "commercecloud-ocapi-client";

export default class Customer {

    private _customer: any;
    private _basket: Promise<any>;

    constructor() {
        console.info("Customer Initialize", ShopApi);
    }

    get customer() {
        return this._customer;
    }

    set customer(customer) {
        this._customer = ShopApi.Customer.constructFromObject(customer);
    }

    get basket() {
        return this._basket;
    }

    set basket(basket: any) {
        this._basket = basket;
    }

    public async init() {
        try {
            await this.getJWT();
            await this.getBasket();
        } catch (err) {
            console.error(err);
        }
    }

    private async getJWT() {
        const api = new ShopApi.CustomersApi();
        console.log("Requesting JWT");
        this.customer = await api.postCustomersAuth({ type: "session" });
    }

    private async getBasket() {
        const api = new ShopApi.CustomersApi();
        console.log("Requesting Baskets", this.customer);
        const result = await api.getCustomersByIDBaskets(this.customer.customer_id);
        if (result && result.total) {
            console.log("Baskets", result.baskets);
            // TODO need to find out when there may be multiple baskets and if you can tell which one is in use in storefront.
            this.basket = result.baskets[0];
        }
        
    }

    public async deleteBasket(id = this.basket.basket_id) {
        const api = new ShopApi.BasketsApi();
        await api.deleteBasketsByID(id);
    }

}