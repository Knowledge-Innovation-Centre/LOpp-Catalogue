/**
 * The external dependencies.
 */
import { getWhitelistedUserConfig } from './utils.js';

const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');

/**
 * The internal dependencies.
 */

/**
 * Get maps SASS from variables.
 *
 * @param {object} variables
 * @param {number} level
 * @returns {string}
 */
const getMapsSass = (variables, level = 0) => {
  const sass = [];
  const maps = Object.keys(variables);

  for (let i = 0; i < maps.length; i++) {
    const map = maps[i];
    const values = variables[map];
    const indentation = '  '.repeat(level);
    const mapPrefix = level === 0 ? '$' : '';
    let mapSuffix = level === 0 ? ';' : ',';
    mapSuffix = level === 0 || i < maps.length - 1 ? mapSuffix : '';

    if (typeof values !== 'object' || values === null) {
      continue;
    }

    const names = Object.keys(values);

    sass.push(`${indentation}${mapPrefix}${map}: (`);

    for (let j = 0; j < names.length; j++) {
      const name = names[j];
      const value = values[name];
      const suffix = j < names.length - 1 ? ',' : '';

      if (typeof value === 'object' && value !== null) {
        sass.push(`${indentation}${getMapsSass(value, level + 1)}${suffix}`);
      } else if (typeof value === 'string' || typeof value === 'number') {
        sass.push(`${indentation}  ${name}: ${value}${suffix}`);
      }
    }

    sass.push(`${indentation})${mapSuffix}`);

    if (level === 0) {
      sass.push('');
    }
  }

  return sass.join('\n');
};

/**
 * Flatten variables from config.json, prefixing the variables names with dasherized parent names.
 *
 * @param {object} variables
 * @param {string|undefined} prefix
 * @returns {object}
 */
const flattenVariables = (variables, prefix) => {
  prefix = typeof prefix !== 'undefined' ? `${prefix}-` : '';
  let flattenned = {};

  for (const name in variables) {
    const value = variables[name];

    if (typeof value === 'string') {
      flattenned[prefix + name] = value;
      continue;
    }

    if (typeof value === 'object' && value.constructor === Object) {
      flattenned = Object.assign(flattenned, flattenVariables(value, prefix + name));
    }
  }

  return flattenned;
};

/**
 * Get flat variables SASS from flattened variables.
 *
 * @param {object} variables
 * @returns {string}
 */
const getFlatVariablesSass = (variables) => {
  const sassVariables = flattenVariables(variables);
  const sass = [];

  for (const name in sassVariables) {
    const value = sassVariables[name];
    sass.push(`$${name}: ${value};`);
  }

  return sass.join('\n');
};

/**
 * Return SASS output based on config.
 *
 * @param {object} config
 * @returns {string}
 */
const getSass = (config) => {
  const sass = ['/**', '* Config.', '*', '* This is an automatically generated file - DO NOT edit manually.', '*/', ''];
  sass.push('// Maps.');
  sass.push(getMapsSass(config.variables));
  sass.push('// Variables.');
  sass.push(getFlatVariablesSass(config.variables));
  return sass.join('\n');
};

/**
 * Config loader.
 *
 * @param {string} rawConfig
 * @returns {string}
 */
module.exports = function (rawConfig) {
  const options = loaderUtils.getOptions(this);
  const config = getWhitelistedUserConfig(JSON.parse(rawConfig));

  if (typeof options.sassOutput !== 'undefined') {
    const sass = getSass(config);

    this._module.reasons.forEach((reason) => {
      const file = loaderUtils.interpolateName({
        resourcePath: reason.module.context,
      }, options.sassOutput, { content: sass });

      fs.writeFileSync(path.resolve(this.context, file), sass);
    });
  }

  // Make sure the JSON is inlined as an object instead of being parsed at runtime.
  return `module.exports = ${JSON.stringify(config)};`;
};
