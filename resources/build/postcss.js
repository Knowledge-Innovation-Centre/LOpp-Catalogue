/**
 * The internal dependencies.
 */
import postcss from 'postcss-discard-comments';
import autoprefixer from 'autoprefixer';
import {detectEnv} from './lib/utils.js';
import tailwindcss from './tailwindcss.js';

const env = detectEnv();
/**
 * Setup PostCSS plugins.
 */
const plugins = {
  // import('tailwindcss')(srcPath('build/tailwindcss.js')),
  tailwindcss,
  postcss,
  autoprefixer,
  // Uncomment to enable combined media queries.
  // require('./lib/combine-media-queries'),
};

if (env.isProduction && !env.isDebug) {
  // plugins.cssnano = cssnanoPlugin({
  //   preset: 'default',
  // });
}

/**
 * Prepare the configuration.
 */
const config = {
  postcssOptions: {
    plugins,
  },
};

export default config;
