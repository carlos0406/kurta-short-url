import { GetShortUrlByIdUseCase } from '../../src/shorturl/application/usecases/get-short-url-by-id.usecase';
import { FakeShortUrlRepository } from '../fixtures/fake-short-url.repository';
import { ShortUrl } from '../../src/shorturl/domain/entities/short-url.entity';

describe('GetShortUrlByIdUseCase', () => {
  let useCase: GetShortUrlByIdUseCase;
  let repository: FakeShortUrlRepository;

  beforeEach(() => {
    repository = new FakeShortUrlRepository();
    useCase = new GetShortUrlByIdUseCase(repository);
  });

  it('should get a short url by id successfully', async () => {
    const shortUrl = new ShortUrl(
      'test-id-1',
      'https://example.com',
      'example',
      new Date('2025-01-01'),
      'user-1',
      'org-1',
    );

    await repository.create(shortUrl);

    const result = await useCase.execute('test-id-1', 'org-1');

    expect(result).not.toBeNull();
    expect(result?.id).toBe('test-id-1');
    expect(result?.originalUrl).toBe('https://example.com');
    expect(result?.name).toBe('example');
    expect(result?.createdBy).toBe('user-1');
    expect(result?.createdByOrganization).toBe('org-1');
  });

  it('should return null when short url does not exist', async () => {
    const result = await useCase.execute('non-existent-id', 'org-1');

    expect(result).toBeNull();
  });

  it('should return null when trying to access url from different organization', async () => {
    const shortUrl = new ShortUrl(
      'test-id-1',
      'https://example.com',
      'example',
      new Date('2025-01-01'),
      'user-1',
      'org-1',
    );

    await repository.create(shortUrl);

    const result = await useCase.execute('test-id-1', 'org-2');

    expect(result).toBeNull();
  });

  it('should only return urls from the specified organization', async () => {
    const shortUrl1 = new ShortUrl(
      'test-id-1',
      'https://example1.com',
      'example1',
      new Date('2025-01-01'),
      'user-1',
      'org-1',
    );

    const shortUrl2 = new ShortUrl(
      'test-id-2',
      'https://example2.com',
      'example2',
      new Date('2025-01-01'),
      'user-2',
      'org-2',
    );

    await repository.create(shortUrl1);
    await repository.create(shortUrl2);

    const result = await useCase.execute('test-id-1', 'org-1');

    expect(result).not.toBeNull();
    expect(result?.id).toBe('test-id-1');
    expect(result?.createdByOrganization).toBe('org-1');
  });
});
