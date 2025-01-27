const config = {
    schema: 'https://graphql.anilist.co',
    documents: ['app/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
    generates: {
      './lib/types/anilist.ts': {
        plugins: ['typescript', 'typescript-operations'],
        config: {
          skipTypename: false,
          withHooks: true,
          withRefetchFn: true,
        },
      },
    },
  };
  
  export default config;