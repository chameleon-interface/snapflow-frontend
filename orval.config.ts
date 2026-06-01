import { defineConfig } from 'orval';

export default defineConfig({
  snapflow: {
    input: {
      target: 'https://stage.snapflow.cc/api/v1/docs-json',
    },
    output: {
      mode: 'tags-split',
      client: 'axios-functions',
      target: 'src/shared/api/generated/endpoints/core',
      schemas: 'src/shared/api/generated/model/core',
      clean: true,
      override: {
        mutator: {
          path: './src/shared/api/generated/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
  payments: {
    input: {
      target: 'https://stage.payments.snapflow.cc/api/v1/docs-json',
    },
    output: {
      mode: 'tags-split',
      client: 'axios-functions',
      target: 'src/shared/api/generated/endpoints/payments',
      schemas: 'src/shared/api/generated/model/payments',
      clean: true,
      override: {
        mutator: {
          path: './src/shared/api/generated/mutator/payments-instance.ts',
          name: 'paymentsInstance',
        },
      },
    },
  },
});
