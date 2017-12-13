import Shipping from "./shipping";
export interface IConfiguration {
    minicart: {
        enabled: boolean;
    };
}
export default class SFCCPayPal {
    static defaultConfig: IConfiguration;
    static shipping: typeof Shipping;
    private config;
    private script;
    private url;
    constructor(config: Partial<IConfiguration>);
}
