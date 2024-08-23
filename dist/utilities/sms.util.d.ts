export declare class SmsService {
    private client;
    private ACCOUNT_SID;
    private AUTH_TOKEN;
    constructor();
    sendSms(to: string, body: string): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
}
