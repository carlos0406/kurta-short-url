import { ShortUrl } from '../entities/short-url.entity';

export interface IShortUrlRepository {
  create(shortUrl: ShortUrl): Promise<void>;
  findById(id: string, organizationId: string): Promise<ShortUrl | null>;
  findAll(organizationId: string): Promise<ShortUrl[]>;
}
