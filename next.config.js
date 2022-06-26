/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async redirects() {
		return [
			{
				source: "/practice",
				destination: "/",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
