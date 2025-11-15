import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateShortUrlUseCase } from '../application/usecases/create-short-url.usecase';
import {
  type CreateShortUrlDto,
  createShortUrlDto,
} from '../application/dtos/create-short-url.dto';
import { ShortUrlResponseDto } from '../application/dtos/short-url-response.dto';
import { ZodValidationPipe } from 'src/commom/pipes';

@Controller('shorturl')
export class ShortUrlController {
  @Inject('CREATE_SHORTURL_USECASE')
  private readonly createUseCase: CreateShortUrlUseCase;

  @Post()
  async createShortUrl(
    @Body(new ZodValidationPipe(createShortUrlDto))
    input: CreateShortUrlDto,
  ): Promise<ShortUrlResponseDto> {
    return await this.createUseCase.execute(input);
  }
}
