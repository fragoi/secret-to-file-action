import { dirname } from 'path';
import { mkdir, writeFile, rm } from 'fs/promises';
import { getInput, info } from '@actions/core';

export async function main() {
  const text = getInput('text');
  const path = getInput('path');
  info(`Writing file: ${path}`);

  const dir = dirname(path);
  await mkdir(dir, { recursive: true });
  await writeFile(path, text, { encoding: 'utf-8', flag: 'wx' });
}

export async function post() {
  const path = getInput('path');
  info(`Removing file: ${path}`);

  await rm(path);
}
