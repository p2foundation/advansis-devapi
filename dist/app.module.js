"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const constants_1 = require("./constants");
const notification_module_1 = require("./notification/notification.module");
const reloadly_module_1 = require("./reloadly/reloadly.module");
const reward_module_1 = require("./reward/reward.module");
const transaction_module_1 = require("./transaction/transaction.module");
const airtime_module_1 = require("./one4all/airtime/airtime.module");
const internet_module_1 = require("./one4all/internet/internet.module");
const mobilemoney_module_1 = require("./one4all/mobilemoney/mobilemoney.module");
const sms_module_1 = require("./one4all/sms/sms.module");
const pscardpayment_module_1 = require("./payswitch/pscardpayment/pscardpayment.module");
const psmobilemoney_module_1 = require("./payswitch/psmobilemoney/psmobilemoney.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || constants_1.MONGODB_URI),
            axios_1.HttpModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            reward_module_1.RewardModule,
            transaction_module_1.TransactionModule,
            notification_module_1.NotificationModule,
            reloadly_module_1.ReloadlyModule,
            airtime_module_1.AirtimeModule,
            internet_module_1.InternetModule,
            mobilemoney_module_1.MobilemoneyModule,
            sms_module_1.SmsModule,
            pscardpayment_module_1.PscardpaymentModule,
            psmobilemoney_module_1.PsmobilemoneyModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: app_service_1.AppService,
                useClass: app_service_1.AppService,
            },
            {
                provide: 'APP_NAME',
                useValue: 'Advansis API v1.0.0',
            },
            {
                provide: 'MESSAGE',
                inject: ['APP_NAME'],
                useFactory: (appName) => `Hello, ${appName}!`,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map