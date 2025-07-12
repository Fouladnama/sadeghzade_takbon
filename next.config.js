/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: true,
    distDir: 'build',
    images: {
        domains: ['takbon.biz'],
    },
    // swcMinify: true,
}

module.exports = nextConfig
