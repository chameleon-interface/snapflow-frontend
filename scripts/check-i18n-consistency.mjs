import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesDir = path.resolve(
  __dirname,
  '../src/shared/config/i18n/messages',
);
const sourceLocale = process.env.I18N_SOURCE_LOCALE ?? 'en';
const sourceFile = `${sourceLocale}.json`;

const flattenKeys = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return [prefix];
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    if (!entries.length && prefix) {
      return [prefix];
    }

    return entries.flatMap(([key, nested]) => {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      return flattenKeys(nested, nextPrefix);
    });
  }

  return prefix ? [prefix] : [];
};

const readJson = async (filePath) => {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
};

const relativePath = (fileName) => path.posix.join('messages', fileName);

const run = async () => {
  const files = (await readdir(messagesDir))
    .filter((name) => name.endsWith('.json'))
    .sort();

  if (!files.length) {
    console.error(`No locale files found in ${messagesDir}`);
    process.exit(1);
  }

  if (!files.includes(sourceFile)) {
    console.error(
      `Source locale file "${sourceFile}" was not found in ${messagesDir}`,
    );
    process.exit(1);
  }

  const sourceMessages = await readJson(path.join(messagesDir, sourceFile));
  const sourceKeys = new Set(flattenKeys(sourceMessages));

  let hasErrors = false;

  for (const localeFile of files) {
    if (localeFile === sourceFile) continue;

    const localeMessages = await readJson(path.join(messagesDir, localeFile));
    const localeKeys = new Set(flattenKeys(localeMessages));

    const missingKeys = [...sourceKeys].filter((key) => !localeKeys.has(key));
    const extraKeys = [...localeKeys].filter((key) => !sourceKeys.has(key));

    if (!missingKeys.length && !extraKeys.length) {
      continue;
    }

    hasErrors = true;
    console.error(
      `\nLocale ${relativePath(localeFile)} is inconsistent with ${relativePath(sourceFile)}:`,
    );

    if (missingKeys.length) {
      console.error('  Missing keys:');
      missingKeys.forEach((key) => console.error(`    - ${key}`));
    }

    if (extraKeys.length) {
      console.error('  Extra keys:');
      extraKeys.forEach((key) => console.error(`    - ${key}`));
    }
  }

  if (hasErrors) {
    console.error('\ni18n consistency check failed.');
    process.exit(1);
  }

  console.log(`i18n consistency check passed for ${files.length} locale files.`);
};

run().catch((error) => {
  console.error('i18n consistency check failed with an unexpected error:');
  console.error(error);
  process.exit(1);
});
