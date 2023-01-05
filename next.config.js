/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/todo',
        permanent: true,
      },
    ]
  },
}
