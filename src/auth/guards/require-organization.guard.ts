import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_ORGANIZATION } from './require-organization.decorator';
import { type ExtendedSession } from 'src/commom/types';
import { type Request } from 'express';

@Injectable()
export class RequireOrganizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireOrganization = this.reflector.get<boolean>(
      REQUIRE_ORGANIZATION,
      context.getHandler(),
    );

    if (!requireOrganization) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const session: ExtendedSession | undefined = request.session;

    if (!session) {
      throw new UnauthorizedException('No session found');
    }

    const activeOrganizationId = session.session.activeOrganizationId;

    if (!activeOrganizationId || typeof activeOrganizationId !== 'string') {
      throw new UnauthorizedException(
        'Active organization is required for this operation',
      );
    }

    return true;
  }
}
