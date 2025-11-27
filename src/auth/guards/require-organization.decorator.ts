import { SetMetadata } from '@nestjs/common';

export const REQUIRE_ORGANIZATION = 'requireOrganization';

export const RequireOrganization = () =>
  SetMetadata(REQUIRE_ORGANIZATION, true);
