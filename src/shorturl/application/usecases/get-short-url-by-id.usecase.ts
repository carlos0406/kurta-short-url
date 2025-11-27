import { IShortUrlRepository } from '../../domain/repositories/short-url.repository.interface';
import { ShortUrlResponseDto } from '../dtos/short-url-response.dto';

export class GetShortUrlByIdUseCase {
  constructor(private readonly shortUrlRepository: IShortUrlRepository) {}

  async execute(
    id: string,
    organizationId: string,
  ): Promise<ShortUrlResponseDto | null> {
    const shortUrl = await this.shortUrlRepository.findById(id, organizationId);

    if (!shortUrl) {
      return null;
    }

    return ShortUrlResponseDto.fromEntity(shortUrl);
  }
}
