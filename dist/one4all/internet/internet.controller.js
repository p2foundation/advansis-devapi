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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const internet_dto_1 = require("./dto/internet.dto");
const internet_service_1 = require("./internet.service");
let InternetController = class InternetController {
    constructor(internetService) {
        this.internetService = internetService;
        this.logger = new common_1.Logger('InternetController');
    }
    async buyInternetData(bidDto) {
        this.logger.log(`INTERNET DATA dto => ${JSON.stringify(bidDto)}`);
        const ts = await this.internetService.topupInternetData(bidDto);
        return ts;
    }
    async listDataBundle(ldbDto) {
        this.logger.log(`BUNDLE LIST dto => ${JSON.stringify(ldbDto)}`);
        const ta = await this.internetService.dataBundleList(ldbDto);
        return ta;
    }
};
exports.InternetController = InternetController;
__decorate([
    (0, common_1.Post)('/buydata'),
    (0, swagger_1.ApiOperation)({ summary: 'Buy internet data' }),
    (0, swagger_1.ApiBody)({ type: internet_dto_1.InternetDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successful response' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [internet_dto_1.InternetDto]),
    __metadata("design:returntype", Promise)
], InternetController.prototype, "buyInternetData", null);
__decorate([
    (0, common_1.Post)('/bundlelist'),
    (0, swagger_1.ApiOperation)({ summary: 'List data bundles' }),
    (0, swagger_1.ApiBody)({ type: internet_dto_1.InternetDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successful response' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [internet_dto_1.InternetDto]),
    __metadata("design:returntype", Promise)
], InternetController.prototype, "listDataBundle", null);
exports.InternetController = InternetController = __decorate([
    (0, swagger_1.ApiTags)('Internet'),
    (0, common_1.Controller)('api/v1/internet'),
    __metadata("design:paramtypes", [internet_service_1.InternetService])
], InternetController);
//# sourceMappingURL=internet.controller.js.map