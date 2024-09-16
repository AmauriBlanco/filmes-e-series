// next.config.mjs
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
        ],
    },
    trailingSlash: true,
    async rewrites() {
        return [
            {
                source: "/filmes/:path*",
                destination: "/pages/filmes/:path*",
            },
            {
                source: "/series/:path*",
                destination: "/pages/series/:path*",
            },
            {
                source: "/detalhes-filme/:id",
                destination: "/pages/detalhes-filme/:id",
            },
            {
                source: "/detalhes-serie/:id",
                destination: "/pages/detalhes-serie/:id",
            },
        ];
    },
};

export default nextConfig;
