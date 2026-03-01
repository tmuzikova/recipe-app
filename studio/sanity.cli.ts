import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '3n5olt0i',
    dataset: 'production',
  },
  graphql: [
    {
      playground: true,
      id: 'default',
      workspace: 'recipes-studio',
    },
  ],
});
