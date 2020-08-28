module.exports = {
  pathPrefix: "/quote",
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Quote",
        short_name: "Quote",
        start_url: "/quote",
        theme_color: "#86232d",
        display: "standalone",
        icon: "src/icon.png",
      },
    },
    "gatsby-plugin-offline",
  ],
};
