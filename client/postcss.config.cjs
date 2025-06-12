module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {
            overrideBrowserslist: [
                'last 2 versions',
                'Safari >= 14',
                'Firefox >= 78',
            ],
        },
    },
};
