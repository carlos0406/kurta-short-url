import { ShortUrl } from '../../domain/entities/short-url.entity';

export class ShortUrlCreateResponseDto {
  constructor(public readonly id: string) {}
}

export class ShortUrlResponseDto {
  constructor(
    public readonly id: string,
    public readonly originalUrl: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly createdBy: string,
    public readonly createdByOrganization: string,
  ) {}

  static fromEntity(entity: ShortUrl): ShortUrlResponseDto {
    return new ShortUrlResponseDto(
      entity.id,
      entity.originalUrl,
      entity.name,
      entity.createdAt,
      entity.createdBy,
      entity.createdByOrganization,
    );
  }
}
