"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const jwt_refresh_strategy_1 = require("./jwt-refresh.strategy");
const user_service_1 = require("../user/user.service");
const user_module_1 = require("../user/user.module");
const email_service_1 = require("../utilities/email.service");
const sms_util_1 = require("../utilities/sms.util");
const jwt_1 = require("@nestjs/jwt");
const gravatar_util_1 = require("../utilities/gravatar.util");
const local_strategy_1 = require("./local.strategy");
const merchant_module_1 = require("../merchant/merchant.module");
const merchant_service_1 = require("../merchant/merchant.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: `${process.env.JWT_SECRET}`,
                signOptions: { expiresIn: '60m' },
            }),
            merchant_module_1.MerchantModule
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            jwt_1.JwtService,
            user_service_1.UserService,
            email_service_1.EmailService,
            sms_util_1.SmsService,
            gravatar_util_1.GravatarService,
            local_strategy_1.LocalStrategy,
            merchant_service_1.MerchantService
        ],
        exports: [
            auth_service_1.AuthService,
            email_service_1.EmailService,
            sms_util_1.SmsService
        ]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map