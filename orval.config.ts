
export default {
  passman: {
    input: {
      target: 'http://localhost:3000/openapi.json',
    },
    output: {
      mode: 'split',
      target: 'src/services/api-client/',
      client: 'react-query',
      httpClient: 'fetch',
      biome: true,
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        query: {
          useQuery: true,
          options: {
            staleTime: 10000,
          },
        },
        urlEncodeParameters: true,
      },
      mock: false,
    },
    hooks: {
      afterAllFilesWrite: 'biome format --write',
    },
  },
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
};
