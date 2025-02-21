import { defineConfig } from 'orval';

export default defineConfig({
  passman: {
    input: {
      target: 'http://localhost:3000/openapi.json',
    },
    output: {
      mode: 'split',
      target: 'src/api-client/api.ts',
      client: 'react-query',
      httpClient: 'fetch',
      baseUrl: 'http://localhost:3000',
      mock: false,
      docs: false,
      biome: true,
      urlEncodeParameters: true,
      override: {
        mutator: {
          path: './src/lib/custom.fetch.ts',
          name: 'customFetch',
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
        query: {
          useQuery: true,
          useMutation: true,
          options: {
            staleTime: 10000,
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'biome format --write',
    },
  },
  // passman: {
  //   input: {
  //     target: 'http://localhost:3000/openapi.json',
  //   },
  //   output: {
  //     mode: 'split',
  //     target: 'src/services/api-client/api.ts',
  //     client: 'react-query',
  //     httpClient: 'fetch',
  //     mock: false,
  //     docs: false,
  //     biome: true,
  //     urlEncodeParameters: true,
  //     override: {
  //       fetch: {
  //         includeHttpResponseReturnType: false,
  //       },
  //       query: {
  //         useQuery: true,
  //         useMutation: true,
  //         options: {
  //           staleTime: 10000,
  //         },
  //       },
  //     },
  //   },
  //   hooks: {
  //     afterAllFilesWrite: 'biome format --write',
  //   },
  // },
  // passmanZod: {
  //   input: {
  //     target: 'http://localhost:3000/openapi.json',
  //   },
  //   output: {
  //     mode: 'split',
  //     client: 'zod',
  //     target: 'src/services/api-client/api.zod.ts',
  //     biome: true
  //   },
  //   hooks: {
  //     afterAllFilesWrite: 'biome format --write',
  //   },
  // }
});
