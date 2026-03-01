export const env = {
  sanity: {
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
    dataset: (import.meta.env.VITE_SANITY_DATASET as string) || 'production',
  },
} as const;
