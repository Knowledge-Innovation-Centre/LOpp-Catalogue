import webpack from 'webpack';

import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ManifestPlugin from 'webpack-assets-manifest';

import {VueLoaderPlugin} from 'vue-loader';
import entry from './webpack/entry.js';
import output from './webpack/output.js';
import resolve from './webpack/resolve.js';
import externals from './webpack/externals.js';

import {detectEnv, distImagesPath, filehashFilter, rootPath, srcImagesPath, tests,} from './lib/utils.js';
import configLoader from './config-loader.js';
import spriteSmith from './spritesmith.js';
import spriteSvg from './spritesvg.js';
import postcss from './postcss.js';
import ImageminPlugin from 'imagemin-webpack-plugin';
import imageminMozjpeg from 'imagemin-mozjpeg'

/**
 * Setup the env.
 */
const env = detectEnv();

/**
 * Setup babel loader.
 */
const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: false,
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
  new VueLoaderPlugin(),
  spriteSmith,
  spriteSvg,
  new ImageminPlugin.default({
    optipng: {
      optimizationLevel: 7,
    },
    gifsicle: {
      optimizationLevel: 3,
    },
    svgo: {
      plugins: [
        { cleanupAttrs: true },
        { removeDoctype: true },
        { removeXMLProcInst: true },
        { removeComments: true },
        { removeMetadata: true },
        { removeUselessDefs: true },
        { removeEditorsNSData: true },
        { removeEmptyAttrs: true },
        { removeHiddenElems: false },
        { removeEmptyText: true },
        { removeEmptyContainers: true },
        { cleanupEnableBackground: true },
        { removeViewBox: true },
        { cleanupIDs: false },
        { convertStyleToAttrs: true },
      ],
    },
    plugins: [
      imageminMozjpeg({
        quality: 100,
      }),
    ],
  }),
  new ManifestPlugin(),
];

// When doing a combined build, only clean up the first time.
if (env.isCombined && env.isDebug) {
  plugins.push(new CleanWebpackPlugin());
}

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
  output,

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
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: env.isDebug ? 'expanded' : 'compressed',
              },
            },
          },
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
              extract: true,
              spriteFilename: 'images/sprite.svg',
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
   * Setup optimizations.
   */
  optimization: {
    minimize: !env.isDebug,
  },

  /**
   * Setup the development tools.
   */
  mode: 'production',
  cache: false,
  bail: false,
  watch: false,
  devtool: false,
};
