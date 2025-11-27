import Redis from 'ioredis';
import * as crypto from 'crypto';

export interface IIdGeneratorService {
  generate(): Promise<string>;
}

export class IdGeneratorService implements IIdGeneratorService {
  private readonly BASE62_CHARS =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly shuffledChars: string;

  constructor(
    private readonly redisClient: Redis,
    private readonly secretKey: string,
  ) {
    this.shuffledChars = this.shuffleAlphabet(this.BASE62_CHARS, secretKey);
  }

  async generate(): Promise<string> {
    const id = await this.redisClient.incr('shorturl:id');
    return this.encodeBase62(id);
  }

  private shuffleAlphabet(alphabet: string, seed: string): string {
    const chars = alphabet.split('');

    const hash = crypto.createHash('sha256').update(seed).digest();

    for (let i = chars.length - 1; i > 0; i--) {
      const hashIndex = i % hash.length;
      const j = hash[hashIndex] % (i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join('');
  }

  private encodeBase62(num: number): string {
    if (num === 0) return this.shuffledChars[0];

    const result: string[] = [];
    let n = num;

    while (n > 0) {
      result.push(this.shuffledChars[n % 62]);
      n = Math.floor(n / 62);
    }

    return result.reverse().join('');
  }
}
