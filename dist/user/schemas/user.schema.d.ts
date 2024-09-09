import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User extends Document {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    gravatar: string;
    roles: string[];
    qrCode: string;
    points: number;
    status: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    qrCodeUsageCount: number;
    lastQRCodeUsage: Date;
    invitationLink: string;
    invitationLinkUsageCount: number;
    lastInvitationLinkUsage: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}>>;
