/**
 * The external dependencies.
 */

import url from 'url';

import webpack from 'webpack';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ManifestPlugin from 'webpack-assets-manifest';
import get from 'lodash/get.js';
import { VueLoaderPlugin } from 'vue-loader';
import entry from './webpack/entry.js';
import output from './webpack/output.js';
import resolve from './webpack/resolve.js';
import externals from './webpack/externals.js';

/**
 * The internal dependencies.
 */
import {
  detectEnv,
  distImagesPath,
  filehashFilter,
  getUserConfig,
  rootPath,
  srcImagesPath,
  tests,
} from './lib/utils.js';
import configLoader from './config-loader.js';
import spriteSmith from './spritesmith.js';
import spriteSvg from './spritesvg.js';
import postcss from './postcss.js';
import DevelopmentModePlugin from './lib/development-mode-plugin.js';

/**
 * Setup the environment.
 */
const env = detectEnv();
const userConfig = getUserConfig();
const devPort = get(userConfig, 'development.port', 3000);
const devHotUrl = url.parse(get(userConfig, 'development.hotUrl', 'http://localhost/').replace(/\/$/, ''));
const hotUrl = `${devHotUrl.protocol}//${devHotUrl.host}:${devPort}/`;

/**
 * Setup babel loader.
 */
const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    comments: false,
    presets: [
      '@babel/preset-env',
    ],
  },
};

/**
 * Setup webpack plugins.
 */
const plugins = [
  new CleanWebpackPlugin(),
  new webpack.WatchIgnorePlugin({
    paths: [
      distImagesPath('sprite.png'),
      distImagesPath('sprite@2x.png'),
    ],
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new MiniCssExtractPlugin({
    filename: `styles/[name]${env.filenameSuffix}.css`,
  }),
  spriteSmith,
  spriteSvg,
  new ManifestPlugin({
    writeToDisk: true,
    publicPath: env.isHot ? hotUrl : null,
  }),
  new DevelopmentModePlugin({ hot: env.isHot }),
  new VueLoaderPlugin(),
];

/**
 * Export the configuration.
 */
export default {
  /**
   * The input.
   */
  entry,

  /**
   * The output.
   */
  output: {
    ...output,
    ...(env.isHot
    // Required to work around https://github.com/webpack/webpack-dev-server/issues/1385
      ? { publicPath: hotUrl }
      : {}
    ),
  },

  /**
   * Resolve utilities.
   */
  resolve,

  /**
   * Resolve the dependencies that are available in the global scope.
   */
  externals,

  /**
   * Setup the transformations.
   */
  module: {
    rules: [
      /**
       * Add support for blogs in import statements.
       */
      {
        enforce: 'pre',
        test: /\.(js|jsx|css|scss|sass)$/,
        use: 'import-glob',
      },

      /**
       * Handle config.json.
       */
      {
        type: 'javascript/auto',
        test: rootPath('config.json'),
        use: configLoader,
      },

      /**
       * Handle scripts.
       */
      {
        test: tests.scripts,
        exclude: /node_modules/,
        use: babelLoader,
      },

      /**
       * Handle styles.
       */
      {
        test: tests.styles,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcss,
          },
          'sass-loader',
        ],
      },

      /**
       * Handle images.
       */
      {
        test: tests.images,
        exclude: [
          srcImagesPath('sprite-svg'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: filehashFilter,
              outputPath: 'images',
            },
          },
        ],
      },

      /**
       * Handle SVG sprites.
       */
      {
        test: tests.svgs,
        include: [
          srcImagesPath('sprite-svg'),
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: false,
            },
          },
        ],
      },

      /**
       * Handle fonts.
       */
      {
        test: tests.fonts,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: filehashFilter,
              outputPath: 'fonts',
            },
          },
        ],
      },

      /**
       * Handle vue.
       */
      {
        test: /\.(vue)$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                compatConfig: {
                  MODE: 2,
                },
              },
            },
          },
        ],
      },
    ],
  },

  /**
   * Setup the transformations.
   */
  plugins,

  /**
   * Setup the development tools.
   */
  mode: 'development',
  cache: true,
  bail: false,
  watch: true,
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: devHotUrl.host,
    port: devPort,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    client: {

      overlay: true,

    },
  },
};
