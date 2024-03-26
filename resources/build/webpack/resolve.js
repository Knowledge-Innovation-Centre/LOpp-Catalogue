/**
 * The internal dependencies.
 */
import {
  distPath,
  rootPath,
  srcFontsPath,
  srcImagesPath,
  srcScriptsPath,
  srcStylesPath,
  srcVendorPath,
} from '../lib/utils.js';

export default {
  modules: [srcScriptsPath(), 'node_modules'],
  extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  alias: {
    '@config': rootPath('config.json'),
    '@scripts': srcScriptsPath(),
    '@styles': srcStylesPath(),
    '@images': srcImagesPath(),
    '@fonts': srcFontsPath(),
    '@vendor': srcVendorPath(),
    '@dist': distPath(),
    '~': rootPath('node_modules'),
    isotope: 'isotope-layout',
    masonry: 'masonry-layout',
    'jquery-ui': 'jquery-ui-dist/jquery-ui.js',
    vue: '@vue/compat',
  },
  fallback: { url: false },
};
