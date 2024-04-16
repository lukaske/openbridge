module.exports = {
    openbridge: {
      input: {
        target: './config/openbridge.yml',
      },
      output: {
        target: './src/api/endpoints/openbridge.ts',
        schemas: './src/api/model',
        mode: 'tags-split',
        client: 'react-query',
        prettier: true,
        override: {
            mutator: {
              path: './src/services/custom-axios-instance.ts',
              name: 'customInstance',
            },
          },   
        },
        // baseUrl: 'https://openbridge.me/', 

    },
  };
 