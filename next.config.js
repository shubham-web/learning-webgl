/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
