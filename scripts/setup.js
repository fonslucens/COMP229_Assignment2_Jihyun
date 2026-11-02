// Convenience helper, not a required part of the course architecture.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const target = fileURLToPath(new URL('../.env', import.meta.url));
if (fs.existsSync(target)) {
  console.log('.env already exists. It was not overwritten.');
} else {
  const example = fs.readFileSync(new URL('../.env.example', import.meta.url), 'utf8');
  const content = example.replace('REPLACE_WITH_RANDOM_SECRET', crypto.randomBytes(32).toString('hex'));
  fs.writeFileSync(target, content, { mode: 0o600, flag: 'wx' });
  console.log('Created .env with a private JWT secret. Now edit MONGODB_URI in .env.');
}
