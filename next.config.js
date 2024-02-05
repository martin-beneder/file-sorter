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
}

module.exports = nextConfig
