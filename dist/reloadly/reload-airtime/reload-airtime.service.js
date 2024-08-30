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
var ReloadAirtimeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReloadAirtimeService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const generator_util_1 = require("../../utilities/generator.util");
let ReloadAirtimeService = ReloadAirtimeService_1 = class ReloadAirtimeService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(ReloadAirtimeService_1.name);
        this.reloadLyBaseURL = constants_1.RELOADLY_BASEURL_SANDBOX;
        this.accessTokenURL = process.env.RELOADLY_BASEURL || constants_1.RELOADLY_BASEURL;
    }
    generateAccessToken() {
        const gatPayload = {
            client_id: process.env.RELOADLY_CLIENT_ID_SANDBOX || constants_1.RELOADLY_CLIENT_ID_SANDBOX,
            client_secret: process.env.RELOADLY_CLIENT_SECRET_SANDBOX || constants_1.RELOADLY_CLIENT_SECRET_SANDBOX,
            grant_type: process.env.RELOADLY_GRANT_TYPE_SANDBOX || constants_1.RELOADLY_GRANT_TYPE_SANDBOX,
            audience: process.env.RELOADLY_AUDIENCE_SANDBOX || constants_1.RELOADLY_AUDIENCE_SANDBOX
        };
        const gatURL = `${this.accessTokenURL}/oauth/token`;
        const configs = {
            url: gatURL,
            body: gatPayload
        };
        this.logger.log(`Access token http configs == ${JSON.stringify(configs)}`);
        return this.httpService
            .post(configs.url, configs.body)
            .pipe((0, operators_1.map)((gatRes) => {
            this.logger.debug(`ACCESS TOKEN HTTPS RESPONSE ++++ ${JSON.stringify(gatRes.data)}`);
            return { accessToken: gatRes.data.access_token };
        }), (0, operators_1.catchError)((gatError) => {
            this.logger.error(`ERROR ACCESS TOKEN RESPONSE --- ${JSON.stringify(gatError.response.data)}`);
            throw new common_1.NotFoundException(gatError.response.data);
        }));
    }
    makeTopUp(airDto) {
        this.reloadlyAccessToken().then(token => {
            this.logger.debug(`...loading token::: ${token}`);
            const rAccessToken = token;
            const { operatorId, amount, recipientEmail, recipientNumber, senderNumber, recipientCountryCode } = airDto;
            const mtPayload = {
                operatorId,
                amount,
                useLocalAmount: false,
                customIdentifier: generator_util_1.GeneratorUtil.generateTransactionId(),
                recipientEmail,
                recipientPhone: {
                    countryCode: recipientCountryCode,
                    number: recipientNumber
                },
                senderPhone: {
                    countryCode: airDto.senderCountryCode,
                    number: senderNumber
                }
            };
            const mtURL = `https://topups-sandbox.reloadly.com/topups`;
            const config = {
                url: mtURL,
                body: mtPayload,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/com.reloadly.topups-v1+json",
                    Authorization: `Bearer ${rAccessToken}`
                }
            };
            this.logger.log(`Access token http configs == ${JSON.stringify(config)}`);
            return this.httpService
                .post(config.url, config.body, { headers: config.headers })
                .pipe((0, operators_1.map)((mtRes) => {
                this.logger.debug(`MAKE TOPUP RESPONSE ++++ ${JSON.stringify(mtRes.data)}`);
                return mtRes.data;
            }), (0, operators_1.catchError)((mtError) => {
                this.logger.error(`ERROR ACCESS TOKEN RESPONSE --- ${JSON.stringify(mtError.response.data)}`);
                const mtErrorMessage = mtError.response.data;
                throw new common_1.NotFoundException(mtErrorMessage);
            }));
        }).catch(error => {
            this.logger.error(`Error generating access token: ${error.message}`);
            throw new common_1.NotFoundException('Failed to generate access token');
        });
    }
    makeAsynchronousTopUp(matDto) {
        let rAccessToken = this.reloadlyAccessToken();
        const { operatorId, amount, recipientEmail, recipientNumber, senderNumber, recipientCountryCode } = matDto;
        const matPayload = {
            operatorId,
            amount,
            useLocalAmount: false,
            customIdentifier: generator_util_1.GeneratorUtil.generateTransactionId(),
            recipientEmail,
            recipientPhone: {
                countryCode: recipientCountryCode,
                number: recipientNumber
            },
            senderPhone: {
                countryCode: matDto.senderCountryCode,
                number: senderNumber
            }
        };
        const matURL = `https://topups-sandbox.reloadly.com/topups-async`;
        const config = {
            url: matURL,
            body: matPayload,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/com.reloadly.topups-v1+json",
                Authorization: `Bearer ${rAccessToken}`
            }
        };
        this.logger.log(`Make Async TopUp configs == ${JSON.stringify(config)}`);
        return this.httpService
            .post(config.url, config.body, { headers: config.headers })
            .pipe((0, operators_1.map)((matRes) => {
            this.logger.debug(`MAKE ASYNC TOP-UP RESPONSE ++++ ${JSON.stringify(matRes.data)}`);
            return matRes.data;
        }), (0, operators_1.catchError)((matError) => {
            this.logger.error(`MAKE ASYNC TOP-UP ERROR --- ${JSON.stringify(matError.response.data)}`);
            const matErrorMessage = matError.response.data;
            throw new common_1.NotFoundException(matErrorMessage);
        }));
    }
    async reloadlyAccessToken() {
        const tokenPayload = {
            client_id: constants_1.RELOADLY_CLIENT_ID_SANDBOX,
            client_secret: constants_1.RELOADLY_CLIENT_SECRET_SANDBOX,
            grant_type: constants_1.RELOADLY_GRANT_TYPE_SANDBOX,
            audience: constants_1.RELOADLY_AUDIENCE_SANDBOX,
        };
        const tokenUrl = `${this.accessTokenURL}/oauth/token`;
        try {
            const response = await this.httpService.post(tokenUrl, tokenPayload).toPromise();
            const accessToken = response.data.access_token;
            return accessToken;
        }
        catch (error) {
            this.logger.error(`Error generating access token: ${error.message}`);
            throw new common_1.NotFoundException('Failed to generate access token');
        }
    }
};
exports.ReloadAirtimeService = ReloadAirtimeService;
exports.ReloadAirtimeService = ReloadAirtimeService = ReloadAirtimeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ReloadAirtimeService);
//# sourceMappingURL=reload-airtime.service.js.map