const environmentVariables = {
  publicRuntimeConfig: {
    pokeapiURL: 'https://pokeapi.co/api/v2/',
    default_limit: 5,
  },
};

module.exports = {
  ...environmentVariables,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokedex',
        permanent: true,
      },
    ];
  },
};
