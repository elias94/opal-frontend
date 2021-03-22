module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://opal-ighsa.ondigitalocean.app/:path*',
        },
      ]
    },
};
