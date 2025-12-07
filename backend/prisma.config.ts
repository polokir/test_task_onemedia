// prisma/prisma.config.ts
import { defineConfig } from '@prisma/config';
import 'dotenv/config';
const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    `DATABASE_URL is not set. Check your .env file or environment variables. ${url}`,
  );
}

export default defineConfig({
  datasource: {
    url: url,
  },
  migrations: { path: 'prisma/migrations' },
  schema: './prisma/schema.prisma',
});
