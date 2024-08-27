"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
const constants_1 = require("../constants");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose.connect(process.env.MONGODB_URI || constants_1.MONGODB_URI),
    },
];
//# sourceMappingURL=database.providers.js.map