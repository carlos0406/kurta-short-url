import { ListShortUrlsUseCase } from '../../src/shorturl/application/usecases/list-short-urls.usecase';
import { FakeShortUrlRepository } from '../fixtures/fake-short-url.repository';
import { ShortUrl } from '../../src/shorturl/domain/entities/short-url.entity';

describe('ListShortUrlsUseCase', () => {
  let useCase: ListShortUrlsUseCase;
  let repository: FakeShortUrlRepository;

  beforeEach(() => {
    repository = new FakeShortUrlRepository();
    useCase = new ListShortUrlsUseCase(repository);
  });

  it('should list all short urls from an organization', async () => {
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
      new Date('2025-01-02'),
      'user-1',
      'org-1',
    );

    await repository.create(shortUrl1);
    await repository.create(shortUrl2);

    const result = await useCase.execute('org-1');

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('test-id-1');
    expect(result[1].id).toBe('test-id-2');
  });

  it('should return empty array when organization has no urls', async () => {
    const result = await useCase.execute('org-1');

    expect(result).toHaveLength(0);
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
      new Date('2025-01-02'),
      'user-2',
      'org-2',
    );

    const shortUrl3 = new ShortUrl(
      'test-id-3',
      'https://example3.com',
      'example3',
      new Date('2025-01-03'),
      'user-1',
      'org-1',
    );

    await repository.create(shortUrl1);
    await repository.create(shortUrl2);
    await repository.create(shortUrl3);

    const result = await useCase.execute('org-1');

    expect(result).toHaveLength(2);
    expect(result[0].createdByOrganization).toBe('org-1');
    expect(result[1].createdByOrganization).toBe('org-1');
    expect(result.every((url) => url.createdByOrganization === 'org-1')).toBe(
      true,
    );
  });

  it('should not return urls from other organizations', async () => {
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
      new Date('2025-01-02'),
      'user-2',
      'org-2',
    );

    await repository.create(shortUrl1);
    await repository.create(shortUrl2);

    const result = await useCase.execute('org-2');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('test-id-2');
    expect(result[0].createdByOrganization).toBe('org-2');
  });
});
