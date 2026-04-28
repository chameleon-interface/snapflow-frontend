import { spawn } from 'node:child_process';

const commands = [
  ['node', ['scripts/check-i18n-consistency.mjs']],
  ['node', ['scripts/check-i18n-placeholders.mjs']],
  ['node', ['scripts/check-i18n-unused.mjs']],
];

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: false,
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Command failed: ${cmd} ${args.join(' ')} (exit ${code})`));
    });
  });

const main = async () => {
  const failures = [];

  for (const [cmd, args] of commands) {
    console.log(`\n> Running: ${cmd} ${args.join(' ')}`);
    try {
      await run(cmd, args);
    } catch (error) {
      failures.push(error.message);
    }
  }

  if (failures.length) {
    console.error('\ni18n validation failed.');
    failures.forEach((message, index) => {
      console.error(`${index + 1}. ${message}`);
    });
    process.exit(1);
  }

  console.log('\nAll i18n validation checks passed.');
};

main().catch((error) => {
  console.error('\ni18n validation failed.');
  console.error(error.message);
  process.exit(1);
});
