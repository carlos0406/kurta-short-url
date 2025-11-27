import { CreateShortUrlUseCase } from '../../src/shorturl/application/usecases/create-short-url.usecase';
import { FakeShortUrlRepository } from '../fixtures/fake-short-url.repository';
import { FakeIdGeneratorService } from '../fixtures/fake-id-generator.service';

describe('CreateShortUrlUseCase', () => {
  let useCase: CreateShortUrlUseCase;
  let repository: FakeShortUrlRepository;
  let idGenerator: FakeIdGeneratorService;

  beforeEach(() => {
    repository = new FakeShortUrlRepository();
    idGenerator = new FakeIdGeneratorService();
    useCase = new CreateShortUrlUseCase(repository, idGenerator);
  });

  it('should create a short url successfully', async () => {
    const input = {
      originalUrl: 'https://example.com',
      name: 'example',
      createdBy: 'user-1',
      createdByOrganization: 'org-1',
    };

    idGenerator.setNextId('custom-id-123');

    const result = await useCase.execute(input);

    expect(result.id).toBe('custom-id-123');

    const shortUrls = repository.getAll();
    expect(shortUrls).toHaveLength(1);
    expect(shortUrls[0].id).toBe('custom-id-123');
    expect(shortUrls[0].originalUrl).toBe('https://example.com');
    expect(shortUrls[0].name).toBe('example');
    expect(shortUrls[0].createdBy).toBe('user-1');
    expect(shortUrls[0].createdByOrganization).toBe('org-1');
  });

  it('should generate unique ids for multiple creations', async () => {
    const input = {
      originalUrl: 'https://example.com',
      name: 'example',
      createdBy: 'user-1',
      createdByOrganization: 'org-1',
    };

    const result1 = await useCase.execute(input);
    const result2 = await useCase.execute(input);

    expect(result1.id).not.toBe(result2.id);
    expect(repository.getAll()).toHaveLength(2);
  });
});
