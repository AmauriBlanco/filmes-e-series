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
};

export default nextConfig;
