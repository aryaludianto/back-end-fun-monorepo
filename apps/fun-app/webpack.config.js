// const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
// const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');
// const { join } = require('path');

// module.exports = {
//   output: {
//     path: join(__dirname, '../../dist/apps/fun-app'),
//   },
//   devServer: {
//     port: 4200,
//   },
//   plugins: [
//     new NxAppWebpackPlugin({
//       tsConfig: './tsconfig.app.json',
//       compiler: 'babel',
//       main: './src/main.tsx',
//       index: './src/index.html',
//       baseHref: '/',
//       assets: ['./src/favicon.ico', './src/assets'],
//       styles: [],
//       outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
//       optimization: process.env['NODE_ENV'] === 'production',
//     }),
//     new NxReactWebpackPlugin({
//       // Uncomment this line if you don't want to use SVGR
//       // See: https://react-svgr.com/
//       // svgr: false
//     }),
//   ],
// };


const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');
const { join } = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
const env = dotenv.config().parsed;

const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/fun-app'),
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main.tsx',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: [],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};
