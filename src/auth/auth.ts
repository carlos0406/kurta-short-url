import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { multiSession, organization } from 'better-auth/plugins';

const prisma = new PrismaClient();
export default betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:3001'],
  organization: {
    enabled: true,
    invite: true,
    role: true,
  },
  plugins: [
    organization({
      allowUserToCreateOrganization: true, // Apenas lógica de permissão
      organizationLimit: 5,
    }),
    multiSession({
      maximumSessions: 1,
    }),
  ],
});
