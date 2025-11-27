import { IIdGeneratorService } from '../../src/shorturl/infrastructure/services/id-generator.service';

export class FakeIdGeneratorService implements IIdGeneratorService {
  private counter = 0;
  private customIds: string[] = [];

  async generate(): Promise<string> {
    if (this.customIds.length > 0) {
      return this.customIds.shift()!;
    }
    this.counter++;
    return `test-id-${this.counter}`;
  }

  // Helper methods for testing
  setNextId(id: string): void {
    this.customIds.push(id);
  }

  setNextIds(ids: string[]): void {
    this.customIds = [...ids];
  }

  reset(): void {
    this.counter = 0;
    this.customIds = [];
  }
}
