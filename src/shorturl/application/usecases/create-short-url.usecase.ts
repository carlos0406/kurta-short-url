import { IShortUrlRepository } from '../../domain/repositories/short-url.repository.interface';
import { ShortUrl } from '../../domain/entities/short-url.entity';
import { CreateShortUrlUseCaseInputDto } from '../dtos/create-short-url.dto';
import { ShortUrlCreateResponseDto } from '../dtos/short-url-response.dto';
import { IIdGeneratorService } from '../../infrastructure/services/id-generator.service';

export class CreateShortUrlUseCase {
  constructor(
    private readonly shortUrlRepository: IShortUrlRepository,
    private readonly idGeneratorService: IIdGeneratorService,
  ) {}

  async execute(
    input: CreateShortUrlUseCaseInputDto,
  ): Promise<ShortUrlCreateResponseDto> {
    const id = await this.idGeneratorService.generate();

    const shortUrl = ShortUrl.create(
      id,
      input.originalUrl,
      input.name,
      input.createdBy,
      input.createdByOrganization,
    );

    await this.shortUrlRepository.create(shortUrl);

    return new ShortUrlCreateResponseDto(id);
  }
}
