module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://opal-to.herokuapp.com/:path*',
        },
      ]
    },
};
