/**
 * The internal dependencies.
 */
import { detectEnv, distPath } from '../lib/utils.js';

const env = detectEnv();

export default {
  path: distPath(),
  filename: `[name]${env.filenameSuffix}.js`,
};
