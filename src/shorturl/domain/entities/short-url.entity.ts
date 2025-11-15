export class ShortUrl {
  constructor(
    public readonly id: string,
    public readonly originalUrl: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly createdBy: string,
    public readonly createdByOrganization: string,
  ) {}

  static create(
    id: string,
    originalUrl: string,
    name: string,
    createdBy: string,
    createdByOrganization: string,
  ): ShortUrl {
    return new ShortUrl(
      id,
      originalUrl,
      name,
      new Date(),
      createdBy,
      createdByOrganization,
    );
  }
}
