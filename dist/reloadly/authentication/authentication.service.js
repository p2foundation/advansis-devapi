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
var AuthenticationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const constants_1 = require("../../constants");
const https = require("https");
const operators_1 = require("rxjs/operators");
let AuthenticationService = AuthenticationService_1 = class AuthenticationService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(AuthenticationService_1.name);
        this.reloadLyBaseURL = constants_1.RELOADLY_BASEURL;
    }
    genAccessToken(authDto) {
        const { grantType, audience } = authDto;
        const authPayload = {
            client_id: constants_1.RELOADLY_CLIENT_ID_SANDBOX,
            client_secret: constants_1.RELOADLY_CLIENT_SECRET_SANDBOX,
            grant_type: constants_1.RELOADLY_GRANT_TYPE_SANDBOX || grantType,
            audience: constants_1.RELOADLY_AUDIENCE_SANDBOX || audience
        };
        const authURL = this.reloadLyBaseURL + `/oauth/token`;
        const configs = {
            url: authURL,
            body: authPayload,
            agent: new https.Agent({
                rejectUnauthorized: false,
            })
        };
        this.logger.log(`access token configs == ${JSON.stringify(configs)}`);
        return this.httpService
            .post(configs.url, configs.body)
            .pipe((0, operators_1.map)((authRes) => {
            this.logger.log(`ACCESS TOKEN response ++++ ${JSON.stringify(authRes.data)}`);
            return authRes.data;
        }), (0, operators_1.catchError)((authError) => {
            this.logger.error(`ACCESS TOKEN ERROR response ---- ${JSON.stringify(authError.response.data)}`);
            const authErrorMessage = authError.response.data;
            throw new common_1.NotFoundException(authErrorMessage);
        }));
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = AuthenticationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map