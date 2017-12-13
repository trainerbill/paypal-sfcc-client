export default class Shipping {
    static page: string;
    static form: Map<string, {
        dw: string;
        pp: string;
    }>;
    private paypalData;
    constructor();
    private populateFields();
}
