import { IShortUrlRepository } from '../../domain/repositories/short-url.repository.interface';
import { ShortUrl } from '../../domain/entities/short-url.entity';
import { CreateShortUrlDto } from '../dtos/create-short-url.dto';
import { ShortUrlResponseDto } from '../dtos/short-url-response.dto';
import { IIdGeneratorService } from '../../infrastructure/services/id-generator.service';

export class CreateShortUrlUseCase {
  constructor(
    private readonly shortUrlRepository: IShortUrlRepository,
    private readonly idGeneratorService: IIdGeneratorService,
  ) {}

  async execute(input: CreateShortUrlDto): Promise<ShortUrlResponseDto> {
    const id = await this.idGeneratorService.generate();

    const shortUrl = ShortUrl.create(
      id,
      input.originalUrl,
      input.name,
      'system',
      'default',
    );

    await this.shortUrlRepository.create(shortUrl);

    return new ShortUrlResponseDto(id);
  }
}
