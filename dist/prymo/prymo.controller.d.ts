import { PrymoService } from './prymo.service';
export declare class PrymoController {
    private readonly prymoService;
    constructor(prymoService: PrymoService);
    topUp(phoneNumber: string, operatorId: string, amount: number, userId: string): Promise<any>;
    getOperators(userId: string): Promise<any>;
    sendSMS(phoneNumber: string, message: string, userId: string): Promise<any>;
}
