module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://opal-to.herokuapp.com/:path*',
        },
        {
          source: "/bee.js",
          destination: "https://cdn.splitbee.io/sb.js",
        },
        {
          source: "/_hive/:slug",
          destination: "https://hive.splitbee.io/:slug",
        },
      ]
    },
}
