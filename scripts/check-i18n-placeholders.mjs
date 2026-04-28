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

const readJson = async (filePath) => {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
};

const flattenLeafStrings = (value, prefix = '', result = new Map()) => {
  if (typeof value === 'string') {
    if (prefix) result.set(prefix, value);
    return result;
  }

  if (Array.isArray(value)) {
    return result;
  }

  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      flattenLeafStrings(nested, nextPrefix, result);
    }
  }

  return result;
};

const extractPlaceholders = (message) => {
  const placeholders = new Set();
  const placeholderRegex = /\{([^{}]+)\}/g;

  let match = placeholderRegex.exec(message);
  while (match) {
    const raw = match[1].trim();
    const name = raw.split(',')[0].trim();
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
      placeholders.add(name);
    }
    match = placeholderRegex.exec(message);
  }

  return placeholders;
};

const asSortedArray = (set) => [...set].sort();

const run = async () => {
  const files = (await readdir(messagesDir))
    .filter((name) => name.endsWith('.json'))
    .sort();

  if (!files.includes(sourceFile)) {
    console.error(
      `Source locale file "${sourceFile}" was not found in ${messagesDir}`,
    );
    process.exit(1);
  }

  const sourceMessages = await readJson(path.join(messagesDir, sourceFile));
  const sourceLeafs = flattenLeafStrings(sourceMessages);

  let hasErrors = false;

  for (const localeFile of files) {
    if (localeFile === sourceFile) continue;

    const localeMessages = await readJson(path.join(messagesDir, localeFile));
    const localeLeafs = flattenLeafStrings(localeMessages);

    for (const [key, sourceMessage] of sourceLeafs.entries()) {
      const localeMessage = localeLeafs.get(key);
      if (typeof localeMessage !== 'string') {
        continue;
      }

      const sourcePlaceholders = extractPlaceholders(sourceMessage);
      const localePlaceholders = extractPlaceholders(localeMessage);

      const missing = asSortedArray(
        new Set(
          [...sourcePlaceholders].filter((name) => !localePlaceholders.has(name)),
        ),
      );
      const extra = asSortedArray(
        new Set(
          [...localePlaceholders].filter((name) => !sourcePlaceholders.has(name)),
        ),
      );

      if (!missing.length && !extra.length) {
        continue;
      }

      hasErrors = true;
      console.error(`\nPlaceholder mismatch in ${localeFile} for key "${key}":`);
      if (missing.length) {
        console.error(`  Missing placeholders: ${missing.join(', ')}`);
      }
      if (extra.length) {
        console.error(`  Extra placeholders: ${extra.join(', ')}`);
      }
    }
  }

  if (hasErrors) {
    console.error('\ni18n placeholder check failed.');
    process.exit(1);
  }

  console.log(`i18n placeholder check passed for ${files.length} locale files.`);
};

run().catch((error) => {
  console.error('i18n placeholder check failed with an unexpected error:');
  console.error(error);
  process.exit(1);
});
