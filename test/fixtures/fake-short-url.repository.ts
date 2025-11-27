import { IShortUrlRepository } from '../../src/shorturl/domain/repositories/short-url.repository.interface';
import { ShortUrl } from '../../src/shorturl/domain/entities/short-url.entity';

export class FakeShortUrlRepository implements IShortUrlRepository {
  private shortUrls: ShortUrl[] = [];

  async create(shortUrl: ShortUrl): Promise<void> {
    this.shortUrls.push(shortUrl);
    return Promise.resolve();
  }

  findById(id: string, organizationId: string): Promise<ShortUrl | null> {
    const shortUrl = this.shortUrls.find(
      (url) => url.id === id && url.createdByOrganization === organizationId,
    );
    return Promise.resolve(shortUrl || null);
  }

  findAll(organizationId: string): Promise<ShortUrl[]> {
    return Promise.resolve(
      this.shortUrls.filter(
        (url) => url.createdByOrganization === organizationId,
      ),
    );
  }

  clear(): void {
    this.shortUrls = [];
  }

  getAll(): ShortUrl[] {
    return [...this.shortUrls];
  }
}
