import { Client } from 'cassandra-driver';
import * as fs from 'fs';
import * as path from 'path';

export class ScyllaDBTestHelper {
  constructor(private readonly client: Client) {}

  async runMigrations(migrationsPath: string): Promise<void> {
    const files = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith('.cql'))
      .sort();

    for (const file of files) {
      const filePath = path.join(migrationsPath, file);
      const query = fs.readFileSync(filePath, 'utf-8');

      // Split by semicolon and run each statement
      const statements = query
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const statement of statements) {
        await this.client.execute(statement);
      }
    }
  }

  async truncateAllTables(): Promise<void> {
    const result = await this.client.execute(
      "SELECT table_name FROM system_schema.tables WHERE keyspace_name = 'kurta'",
    );

    for (const row of result.rows) {
      await this.client.execute(`TRUNCATE TABLE ${row.table_name}`);
    }
  }

  async close(): Promise<void> {
    await this.client.shutdown();
  }
}
