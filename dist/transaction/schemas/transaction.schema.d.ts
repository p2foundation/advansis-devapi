import { Document } from 'mongoose';
export type TransactionDocument = Transaction & Document;
export declare class Transaction {
    userId: string;
    merchantId: string;
    merchantName: string;
    retailerName: string;
    transType: string;
    serviceType: String;
    customerName: String;
    customerEmail: String;
    customerPhone: String;
    serviceTransId: String;
    transMessage: String;
    paymentMethod: String;
    paymentStatus: String;
    currentBalance: String;
    balanceBefore: String;
    balanceAfter: String;
    reward: String;
    commentary: String;
    amount: number;
    currency: string;
    localTransId: String;
    amountPaid: String;
    charge: String;
    recipientNumber: String;
    senderNumber: String;
    transDescription: String;
    transStatus: string;
    referrerClientId?: string;
    transactionId: string;
    networkOperator: string;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
    recipient: recipientNumber;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction> & Transaction & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>> & import("mongoose").FlatRecord<Transaction> & {
    _id: import("mongoose").Types.ObjectId;
}>;
