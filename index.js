import { dirname } from 'path';
import { mkdir, writeFile, rm } from 'fs/promises';

export async function main() {
  const text = process.env.INPUT_TEXT;
  const path = process.env.INPUT_PATH;
  console.log(`Writing file: ${path}`);

  const dir = dirname(path);
  await mkdir(dir, { recursive: true });
  await writeFile(path, text, { encoding: 'utf-8', flag: 'wx' });
}

export async function post() {
  const path = process.env.INPUT_PATH;
  console.log(`Removing file: ${path}`);

  await rm(path);
}
