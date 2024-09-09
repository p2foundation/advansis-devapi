import { Document } from 'mongoose';
export type TransactionDocument = Transaction & Document;
export declare class Transaction {
    userId: string;
    transType: string;
    amount: number;
    currency: string;
    transStatus: string;
    referrerClientId?: string;
    transactionId: string;
    operator: string;
    recipientPhone: string;
    recipientEmail: string;
    dataPackage: string;
    momoTransactionType: string;
    reloadlyProductId: string;
    reloadlyOperatorId: string;
    reloadlyOperatorName: string;
    reloadlyCountryCode: string;
    transactionFee: number;
    discountApplied: number;
    pointsEarned: number;
    pointsRedeemed: number;
    transactionMessage: string;
    timestamp: Date;
    merchantId?: string;
    network?: string;
    trxn?: string;
    fee?: number;
    originalAmount?: string;
    commentary?: string;
    balance_before?: string;
    balance_after?: string;
    currentBalance?: string;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction> & Transaction & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>> & import("mongoose").FlatRecord<Transaction> & {
    _id: import("mongoose").Types.ObjectId;
}>;
