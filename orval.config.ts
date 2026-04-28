import { defineConfig } from 'orval';

export default defineConfig({
  snapflow: {
    input: {
      target: 'https://stage.snapflow.cc/api/v1/docs-json',
    },
    output: {
      mode: 'tags-split',
      client: 'axios-functions',
      target: 'src/shared/api/generated/endpoints',
      schemas: 'src/shared/api/generated/model',
      clean: true,
      override: {
        mutator: {
          path: './src/shared/api/generated/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
