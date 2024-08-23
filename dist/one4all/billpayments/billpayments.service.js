"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillpaymentsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const https = require("https");
const constants_1 = require("../../constants");
const generator_util_1 = require("../../utilities/generator.util");
let BillpaymentsService = class BillpaymentsService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger('BillpaymentsService');
        this.DataUrl = constants_1.ONE4ALL_BASEURL;
    }
    topupInternetBundle(transDto) {
        const { retailer, recipientNumber, dataCode, network, transId } = transDto;
        const tibParams = {
            retailer: constants_1.ONE4ALL_RETAILER || retailer,
            recipient: recipientNumber || '',
            data_code: dataCode || '',
            network: 0 || network,
            trxn: generator_util_1.GeneratorUtil.generateTransactionId() || '',
        };
        const tibUrl = this.DataUrl +
            `/TopUpApi/dataBundle?retailer=${tibParams.retailer}&recipient=${tibParams.recipient}&data_code=${tibParams.data_code}&network=${tibParams.network}&trxn=${tibParams.trxn}`;
        const configs = {
            url: tibUrl,
            headers: { ApiKey: constants_1.ONE4ALL_APIKEY, ApiSecret: constants_1.ONE4ALL_APISECRET },
            agent: new https.Agent({
                rejectUnauthorized: false,
            }),
        };
        this.logger.log(`INTERNET DATA BUNDLE payload config ==> ${JSON.stringify(configs)}`);
        return this.httpService
            .get(configs.url, { httpsAgent: configs.agent, headers: configs.headers })
            .pipe((0, operators_1.map)((tibRes) => {
            this.logger.verbose(`INTERNET DATA BUNDLE server response => ${tibRes.data}`);
            return tibRes.data;
        }), (0, operators_1.catchError)((tibError) => {
            this.logger.error(`ERROR INTERNET DATA BUNDLE => ${tibError.data}`);
            return tibError.data;
        }));
    }
    dataBundleList(transDto) {
        const { network } = transDto;
        const dblParams = { network: 0 || network };
        const dblURL = this.DataUrl + `/TopUpApi/dataBundleList?network=${dblParams.network}`;
        const configs = {
            url: dblURL,
            headers: { ApiKey: constants_1.ONE4ALL_APIKEY, ApiSecret: constants_1.ONE4ALL_APISECRET },
            agent: new https.Agent({
                rejectUnauthorized: false,
            }),
        };
        this.logger.log(`DATA BUNDLE LIST payload config ==> ${JSON.stringify(configs)}`);
        return this.httpService
            .get(configs.url, { httpsAgent: configs.agent, headers: configs.headers })
            .pipe((0, operators_1.map)((dblRes) => {
            this.logger.verbose(`DATA BUNDLE lIST server response => ${dblRes.data}`);
            return dblRes.data;
        }), (0, operators_1.catchError)((dblError) => {
            this.logger.error(`ERROR DATA BUNDLE LIST => ${dblError.data}`);
            return dblError.data;
        }));
    }
};
exports.BillpaymentsService = BillpaymentsService;
exports.BillpaymentsService = BillpaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], BillpaymentsService);
//# sourceMappingURL=billpayments.service.js.map