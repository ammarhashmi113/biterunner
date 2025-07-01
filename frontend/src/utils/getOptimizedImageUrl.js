export const getOptimizedImageUrl = (url, width = 600) => {
    if (!url.includes("/upload/")) return url;
    return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
};
