import { ShortUrl } from '../entities/short-url.entity';

export interface IShortUrlRepository {
  create(shortUrl: ShortUrl): Promise<void>;
  findById(id: string): Promise<ShortUrl | null>;
}
