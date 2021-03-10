const withSass = require('@zeit/next-sass');

module.exports = withSass({
  publicRuntimeConfig: {
    pokeapiURL: 'https://pokeapi.co/api/v2/',
    displayLimit: 5,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokedex',
        permanent: true,
      },
    ];
  },
});

