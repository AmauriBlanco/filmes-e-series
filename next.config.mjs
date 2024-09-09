// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
        ],
    },
    basePath: "/filmes-e-series",
    assetPrefix: "/filmes-e-series/",
    trailingSlash: true,
};

export default nextConfig;
