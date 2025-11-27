import { type Client } from 'cassandra-driver';
import { IShortUrlRepository } from '../../domain/repositories/short-url.repository.interface';
import { ShortUrl } from '../../domain/entities/short-url.entity';

export class CassandraShortUrlRepository implements IShortUrlRepository {
  constructor(private readonly client: Client) {}

  async create(shortUrl: ShortUrl): Promise<void> {
    const query =
      'INSERT INTO short_url (id, original_url, name, created_at, created_by, created_by_organization) VALUES (?, ?, ?, ?, ?, ?)';
    await this.client.execute(
      query,
      [
        shortUrl.id,
        shortUrl.originalUrl,
        shortUrl.name,
        shortUrl.createdAt,
        shortUrl.createdBy,
        shortUrl.createdByOrganization,
      ],
      {
        prepare: true,
      },
    );
  }

  async findById(id: string, organizationId: string): Promise<ShortUrl | null> {
    const query =
      'SELECT * FROM short_url WHERE id = ? AND created_by_organization = ? ALLOW FILTERING';
    const result = await this.client.execute(query, [id, organizationId], {
      prepare: true,
    });

    if (result.rowLength === 0) {
      return null;
    }

    const row = result.first();
    return new ShortUrl(
      row.id,
      row.original_url,
      row.name,
      row.created_at,
      row.created_by,
      row.created_by_organization,
    );
  }

  async findAll(organizationId: string): Promise<ShortUrl[]> {
    const query =
      'SELECT * FROM short_url WHERE created_by_organization = ? ALLOW FILTERING';
    const result = await this.client.execute(query, [organizationId], {
      prepare: true,
    });

    return result.rows.map(
      (row) =>
        new ShortUrl(
          row.id,
          row.original_url,
          row.name,
          row.created_at,
          row.created_by,
          row.created_by_organization,
        ),
    );
  }
}
