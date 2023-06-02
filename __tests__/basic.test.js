import { tmpdir } from 'os';
import { join } from 'path';

import * as index from '../index.js';

const TS = Date.now();
const TMP_FILE = join(tmpdir(), `secret_to_file_action_${TS}_file`);
const TMP_DIR = join(tmpdir(), `secret_to_file_action_${TS}_dir`);

test('Write text to file', async () => {
  process.env.INPUT_TEXT = 'Hello World';
  process.env.INPUT_PATH = TMP_FILE;
  await index.main();
});

test('Do not overwrite file', async () => {
  process.env.INPUT_TEXT = 'Hello World';
  process.env.INPUT_PATH = TMP_FILE;
  await expect(index.main()).rejects.toThrow();
});

test('Write text to file in dir', async () => {
  process.env.INPUT_TEXT = 'Hello World';
  process.env.INPUT_PATH = join(TMP_DIR, 'file');
  await index.main();
});

test('Remove file', async () => {
  process.env.INPUT_PATH = TMP_FILE;
  await index.post();
});

test('Remove file in dir', async () => {
  process.env.INPUT_PATH = join(TMP_DIR, 'file');
  await index.post();
});
