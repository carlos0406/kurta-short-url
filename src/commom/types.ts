import { type UserSession } from '@thallesp/nestjs-better-auth';

export type ExtendedSession = UserSession & {
  session: UserSession['session'] & {
    activeOrganizationId: string;
  };
};
