const path = require('path')
const htmlplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
 entry: './src/app.js', // точка входа в проект
 output: {
  filename: 'bundle.[chunkhash].js',
  path:path.resolve(__dirname, 'public'), // папка публичного пути
  publicPath: '/questionApp/'
 },
 devServer: {
  port: 3000
 },
 plugins: [
  new htmlplugin({
   template: './src/index.html'// команда запуска шаблона страницы
  }),
  new CleanWebpackPlugin()
 ],
 // правила для работы со стилями (CSS)
 module: {
  rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
  ],
}
}