import { IShortUrlRepository } from '../../domain/repositories/short-url.repository.interface';
import { ShortUrlResponseDto } from '../dtos/short-url-response.dto';

export class ListShortUrlsUseCase {
  constructor(private readonly shortUrlRepository: IShortUrlRepository) {}

  async execute(organizationId: string): Promise<ShortUrlResponseDto[]> {
    const shortUrls = await this.shortUrlRepository.findAll(organizationId);

    return shortUrls.map((shortUrl) =>
      ShortUrlResponseDto.fromEntity(shortUrl),
    );
  }
}
