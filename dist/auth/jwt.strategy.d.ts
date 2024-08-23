import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private logger;
    constructor();
    validate(payload: any): Promise<{
        sub: any;
        username: any;
        roles: any;
    }>;
}
export {};
