"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const moment = require("moment");
class DateUtil {
    static formatDate(date, format = 'YYYY-MM-DD') {
        return moment(date).format(format);
    }
    static addDays(date, days) {
        return moment(date).add(days, 'days').toDate();
    }
    static subtractDays(date, days) {
        return moment(date).subtract(days, 'days').toDate();
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map