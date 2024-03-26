/**
 * The external dependencies.
 */
import SvgSpriteLoaderPlugin from 'svg-sprite-loader/plugin.js';

export default new SvgSpriteLoaderPlugin({
  plainSprite: true,
  spriteAttrs: {
    'aria-hidden': 'true',
    style: 'display: none; visibility: hidden;',
  },
});
