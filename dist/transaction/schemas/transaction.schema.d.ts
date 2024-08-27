import { Document } from 'mongoose';
export type TransactionDocument = Transaction & Document;
export declare class Transaction {
    userId: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    referrerClientId?: string;
    transactionId: string;
    operator: string;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction> & Transaction & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>> & import("mongoose").FlatRecord<Transaction> & {
    _id: import("mongoose").Types.ObjectId;
}>;
