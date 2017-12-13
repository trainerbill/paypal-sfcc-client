export default class Shipping {
    static page: string;
    static form: {
        firstName: string;
        lastName: string;
    };
    private paypalData;
    constructor();
    private populateFields();
    map(dwid: string): any;
}
