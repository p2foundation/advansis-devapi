import { Document } from 'mongoose';
export type MerchantDocument = Merchant & Document;
export declare class Merchant {
    name: string;
    email: string;
    phoneNumber: string;
    clientId: string;
    clientKey: string;
    password: string;
    qrCode: string;
    rewardPoints: number;
    address?: Array<{
        ghanaPostGPS: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }>;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const MerchantSchema: import("mongoose").Schema<Merchant, import("mongoose").Model<Merchant, any, any, any, Document<unknown, any, Merchant> & Merchant & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Merchant, Document<unknown, {}, import("mongoose").FlatRecord<Merchant>> & import("mongoose").FlatRecord<Merchant> & {
    _id: import("mongoose").Types.ObjectId;
}>;
