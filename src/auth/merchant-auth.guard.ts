import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MerchantAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const merchant = request.user;

    if (!merchant || merchant.role.toLowerCase() !== 'merchant') {
      throw new UnauthorizedException('Access Denied: Only authorized merchants can access this service');
    }

    return true;
  }
}
