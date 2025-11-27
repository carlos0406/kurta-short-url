import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateShortUrlUseCase } from '../application/usecases/create-short-url.usecase';
import { GetShortUrlByIdUseCase } from '../application/usecases/get-short-url-by-id.usecase';
import { ListShortUrlsUseCase } from '../application/usecases/list-short-urls.usecase';
import {
  type CreateShortUrlInputDto,
  createShortUrlInputDto,
} from '../application/dtos/create-short-url.dto';
import {
  ShortUrlCreateResponseDto,
  ShortUrlResponseDto,
} from '../application/dtos/short-url-response.dto';
import { ZodValidationPipe } from 'src/commom/pipes';
import { Session } from '@thallesp/nestjs-better-auth';
import { type ExtendedSession } from 'src/commom/types';
import { RequireOrganization } from 'src/auth/guards/require-organization.decorator';
import { RequireOrganizationGuard } from 'src/auth/guards/require-organization.guard';

@Controller('shorturl')
export class ShortUrlController {
  @Inject('CREATE_SHORTURL_USECASE')
  private readonly createUseCase: CreateShortUrlUseCase;

  @Inject('GET_SHORTURL_BY_ID_USECASE')
  private readonly getByIdUseCase: GetShortUrlByIdUseCase;

  @Inject('LIST_SHORTURLS_USECASE')
  private readonly listUseCase: ListShortUrlsUseCase;

  @Post()
  @UseGuards(RequireOrganizationGuard)
  @RequireOrganization()
  async createShortUrl(
    @Body(new ZodValidationPipe(createShortUrlInputDto))
    input: CreateShortUrlInputDto,
    @Session() { session, user }: ExtendedSession,
  ): Promise<ShortUrlCreateResponseDto> {
    return await this.createUseCase.execute({
      ...input,
      createdBy: user.id,
      createdByOrganization: session.activeOrganizationId,
    });
  }

  @Get()
  @UseGuards(RequireOrganizationGuard)
  @RequireOrganization()
  async listShortUrls(
    @Session() { session }: ExtendedSession,
  ): Promise<ShortUrlResponseDto[]> {
    return await this.listUseCase.execute(session.activeOrganizationId);
  }

  @Get(':id')
  @UseGuards(RequireOrganizationGuard)
  @RequireOrganization()
  async getShortUrlById(
    @Param('id') id: string,
    @Session() { session }: ExtendedSession,
  ): Promise<ShortUrlResponseDto> {
    const shortUrl = await this.getByIdUseCase.execute(
      id,
      session.activeOrganizationId,
    );

    if (!shortUrl) {
      throw new NotFoundException(`Short URL with id ${id} not found`);
    }

    return shortUrl;
  }
}
