import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesDir = path.resolve(
  __dirname,
  '../src/shared/config/i18n/messages',
);
const sourceDir = path.resolve(__dirname, '../src');

const sourceLocale = process.env.I18N_SOURCE_LOCALE ?? 'en';
const sourceFileName = `${sourceLocale}.json`;
const codeExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs']);

const flattenKeys = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nested]) => {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      return flattenKeys(nested, nextPrefix);
    });
  }

  return prefix ? [prefix] : [];
};

const collectFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (fullPath === messagesDir) continue;
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (codeExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
};

const readJson = async (filePath) => {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
};

const extractTranslatorBindings = (content) => {
  const bindings = new Map();
  const bindingRegex =
    /const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*(?:(['"`])([^'"`]+)\2)?\s*\)/g;

  let match = bindingRegex.exec(content);
  while (match) {
    const [, translatorName, , namespace] = match;
    bindings.set(translatorName, namespace ?? null);
    match = bindingRegex.exec(content);
  }

  return bindings;
};

const extractTranslationCalls = (content, translatorName) => {
  const calls = [];
  const callRegex = new RegExp(
    `\\b${translatorName}\\(\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`,
    'g',
  );

  let match = callRegex.exec(content);
  while (match) {
    const key = match[2];
    calls.push(key);
    match = callRegex.exec(content);
  }

  return calls;
};

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const addTemplateMatches = (allKeys, usedKeys, keyTemplate) => {
  if (!keyTemplate.includes('${')) return;

  const parts = keyTemplate.split(/\$\{[^}]+\}/g).map(escapeRegExp);
  const wildcardPattern = parts.join('[^.]+');
  const matcher = new RegExp(`^${wildcardPattern}$`);

  for (const key of allKeys) {
    if (matcher.test(key)) {
      usedKeys.add(key);
    }
  }
};

const extractDynamicCallIdentifiers = (content, translatorName) => {
  const identifiers = new Set();
  const dynamicCallRegex = new RegExp(
    `\\b${translatorName}\\(\\s*([A-Za-z_$][\\w$]*)\\s*(?:,|\\))`,
    'g',
  );

  let match = dynamicCallRegex.exec(content);
  while (match) {
    identifiers.add(match[1]);
    match = dynamicCallRegex.exec(content);
  }

  return identifiers;
};

const extractDottedStringLiterals = (content) => {
  const dotted = [];
  const literalRegex = /(['"`])((?:\\.|(?!\1).)*)\1/g;

  let match = literalRegex.exec(content);
  while (match) {
    const value = match[2];
    if (value.includes('.') && !value.includes('${')) {
      dotted.push(value);
    }
    match = literalRegex.exec(content);
  }

  return dotted;
};

const extractAllStringLiterals = (content) => {
  const literals = [];
  const literalRegex = /(['"`])((?:\\.|(?!\1).)*)\1/g;

  let match = literalRegex.exec(content);
  while (match) {
    const value = match[2];
    if (!value.includes('${')) {
      literals.push(value);
    }
    match = literalRegex.exec(content);
  }

  return literals;
};

const run = async () => {
  const sourceMessagesPath = path.join(messagesDir, sourceFileName);
  const sourceMessages = await readJson(sourceMessagesPath);
  const allKeys = new Set(flattenKeys(sourceMessages));
  const usedKeys = new Set();
  const allStringLiterals = new Set();
  const dynamicNamespaces = new Set();

  const codeFiles = await collectFiles(sourceDir);

  for (const filePath of codeFiles) {
    const content = await readFile(filePath, 'utf8');
    const fileStringLiterals = extractAllStringLiterals(content);
    fileStringLiterals.forEach((value) => allStringLiterals.add(value));
    const bindings = extractTranslatorBindings(content);

    for (const [translatorName, namespace] of bindings.entries()) {
      const calls = extractTranslationCalls(content, translatorName);

      for (const callKey of calls) {
        if (callKey.includes('${')) {
          if (namespace) {
            addTemplateMatches(allKeys, usedKeys, `${namespace}.${callKey}`);
          } else {
            addTemplateMatches(allKeys, usedKeys, callKey);
          }
          continue;
        }

        if (allKeys.has(callKey)) {
          usedKeys.add(callKey);
          continue;
        }

        if (!namespace) continue;

        const namespacedKey = `${namespace}.${callKey}`;
        if (allKeys.has(namespacedKey)) {
          usedKeys.add(namespacedKey);
        }
      }

      if (namespace) {
        const dynamicIdentifiers = extractDynamicCallIdentifiers(
          content,
          translatorName,
        );
        if (dynamicIdentifiers.size > 0) {
          dynamicNamespaces.add(namespace);
        }
      }
    }

    const dottedLiterals = extractDottedStringLiterals(content);
    for (const dottedKey of dottedLiterals) {
      if (allKeys.has(dottedKey)) {
        usedKeys.add(dottedKey);
      }
    }
  }

  if (dynamicNamespaces.size > 0) {
    for (const namespace of dynamicNamespaces) {
      for (const literal of allStringLiterals) {
        const namespacedKey = `${namespace}.${literal}`;
        if (allKeys.has(namespacedKey)) {
          usedKeys.add(namespacedKey);
        }
      }
    }
  }

  const unusedKeys = [...allKeys].filter((key) => !usedKeys.has(key)).sort();

  if (!unusedKeys.length) {
    console.log('No unused i18n keys detected.');
    return;
  }

  console.error(`Found ${unusedKeys.length} potentially unused i18n keys:`);
  unusedKeys.forEach((key) => console.error(`- ${key}`));
  process.exit(1);
};

run().catch((error) => {
  console.error('i18n unused-key check failed with an unexpected error:');
  console.error(error);
  process.exit(1);
});
