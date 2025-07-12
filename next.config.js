/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: true,
    distDir: 'build',
    // swcMinify: true,
}

module.exports = nextConfig
