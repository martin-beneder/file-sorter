/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
		config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
		return config;
	},
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cdn.builder.io',
            port: '',
            pathname: '/**',
        }]
    },
    experimental: {
        // Enable new React compiler optimizations
        typedRoutes: true,
        // Optimize bundle size and performance
        optimizePackageImports: [
            'lucide-react',
            'react-icons'
        ],
    },
    // Turbo settings (moved from experimental)
    turbopack: {}

}

module.exports = nextConfig
