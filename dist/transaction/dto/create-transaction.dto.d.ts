export declare class CreateTransactionDto {
    readonly userId: string;
    readonly type: string;
    readonly amount: number;
    readonly currency: string;
    readonly referrerClientId?: string;
    readonly operator: string;
    phoneNumber: string;
    operatorId: string;
    transactionId: string;
    status: string;
}
