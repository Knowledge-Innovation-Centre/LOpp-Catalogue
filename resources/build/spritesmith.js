/**
 * The external dependencies.
 */
import SpritesmithPlugin from 'webpack-spritesmith';

/**
 * The internal dependencies.
 */
import { distImagesPath, srcImagesPath, srcStylesPath } from './lib/utils.js';

export default new SpritesmithPlugin({
  src: {
    cwd: srcImagesPath('sprite'),
    glob: '*.{jpg,jpeg,png}',
  },
  target: {
    image: distImagesPath('sprite.png'),
    css: srcStylesPath('frontend/_sprite.scss'),
  },
  apiOptions: {
    cssImageRef: '~@dist/images/sprite.png',
  },
  // Uncomment the following line to enable retina spritesheets:
  // retina: '@2x',
});
