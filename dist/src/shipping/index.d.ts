export default class Shipping {
    static page: string;
    static form: {
        firstName: string;
        lastName: string;
        line1: string;
        line2: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    private paypalData;
    constructor();
    private populateFields();
    map(dwid: string): any;
}
