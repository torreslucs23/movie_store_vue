const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    port: 8082, // Escolha a porta desejada
  },
};

module.exports = {
  configureWebpack: {
    resolve: {
      mainFields: ["main", "browser"],
    },
  },
};
