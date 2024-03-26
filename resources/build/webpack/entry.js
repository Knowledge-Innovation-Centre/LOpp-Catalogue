/**
 * The internal dependencies.
 */
import keyBy from 'lodash/keyBy.js';
import mapValues from 'lodash/mapValues.js';
import { getUserConfig, srcScriptsPath } from '../lib/utils.js';

export default mapValues(
  keyBy(getUserConfig().bundles, (bundle) => bundle),
  (bundle) => srcScriptsPath(`${bundle}/index.js`),
);
