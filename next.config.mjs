/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  images: {
    // domains: ['new.vision-dashbord.com'] // Add your image domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'new.vision-dashbord.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
