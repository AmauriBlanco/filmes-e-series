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
    output: "export", // Adiciona a configuração para exportação estática
};

export default nextConfig;
