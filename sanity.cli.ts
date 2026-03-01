import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '3n5olt0i',
    dataset: 'production',
  },
  typegen: {
    path: './src/**/*.{ts,tsx}',
    overloadClientMethods: true,
  },
});
