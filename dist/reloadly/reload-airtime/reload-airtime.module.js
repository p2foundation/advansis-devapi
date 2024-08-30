"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReloadAirtimeModule = void 0;
const common_1 = require("@nestjs/common");
const reload_airtime_service_1 = require("./reload-airtime.service");
const reload_airtime_controller_1 = require("./reload-airtime.controller");
const axios_1 = require("@nestjs/axios");
let ReloadAirtimeModule = class ReloadAirtimeModule {
};
exports.ReloadAirtimeModule = ReloadAirtimeModule;
exports.ReloadAirtimeModule = ReloadAirtimeModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [reload_airtime_controller_1.ReloadAirtimeController],
        providers: [reload_airtime_service_1.ReloadAirtimeService]
    })
], ReloadAirtimeModule);
//# sourceMappingURL=reload-airtime.module.js.map