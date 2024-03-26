/**
 * The external dependencies.
 */
import {getUserConfig} from '../lib/utils.js';

import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import {sync} from 'glob';

/**
 * The internal dependencies.
 */
import composer from './composer.js';
import archive from './archive.js';

/**
 * Emit if the passed emitter is valid.
 *
 * @param {EventEmitter} emitter
 * @returns {void}
 */
function emit(emitter) {
  if (emitter) {
    emitter.emit.apply(emitter, Array.prototype.slice.call(arguments, 1));
  }
}

/**
 * Perform any failure checks preemptively.
 *
 * @param {string} destination
 * @returns {void}
 */
const validate = (destination) => {
  if (shell.test('-e', destination)) {
    throw new Error(`Destination directory already exists: ${destination}`);
  }

  if (shell.test('-e', `${destination}.zip`)) {
    throw new Error(`Destination zip already exists: ${destination}.zip`);
  }
};

/**
 * Create the release version directory.
 *
 * @param {string} destination
 */
const createDirectory = (destination) => {
  shell.mkdir('-p', destination);
};

/**
 * Copy a single file.
 *
 * @param {string} fileSource
 * @param {string} source
 * @param {string} destination
 * @param {EventEmitter} emitter
 * @returns void
 */
const copyFile = (fileSource, source, destination, emitter) => {
  const fileRelative = path.relative(source, fileSource);
  const fileDestination = path.join(destination, fileRelative);

  if (!shell.test('-e', fileSource)) {
    throw new Error(`File or directory does not exist: ${fileSource}`);
  }

  if (fileRelative === 'vendor') {
    // Skip Composer's vendor directory as we will be handling that separately.
    return;
  }

  emit(emitter, 'file.copy', fileSource);

  if (fileRelative === 'config.json') {
    fs.writeFileSync(fileDestination, JSON.stringify(getUserConfig(fileSource, true)));
  } else {
    shell.mkdir('-p', path.dirname(fileDestination));
    shell.cp('-R', fileSource, fileDestination);
  }

  emit(emitter, 'file.copied', fileSource);
};

/**
 * Copy multiple files and directories recursively based on globs.
 *
 * @param {string} patterns
 * @param {string} source
 * @param {string} destination
 * @param {EventEmitter} emitter
 * @returns void
 */
const copyFiles = (patterns, source, destination, emitter) => {
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    const matches = sync(path.join(source, pattern));

    for (let j = 0; j < matches.length; j++) {
      copyFile(matches[j], source, destination, emitter);
    }
  }
};

/**
 * Install composer dependencies.
 *
 * @param {string} source
 * @param {string} destination
 * @returns {true}
 */
const installComposerDependencies = (source, destination) => {
  const files = ['composer.json', 'composer.lock'];
  const keep = [];

  const setUp = () => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (shell.test('-e', path.join(destination, file))) {
        keep.push(files[i]);
      } else if (shell.test('-e', path.join(source, file))) {
        shell.cp(path.join(source, file), path.join(destination, file));
      }
    }
  };

  const tearDown = () => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (keep.indexOf(file) === -1) {
        shell.rm(path.join(destination, file));
      }
    }
  };

  setUp();
  const result = composer.installProductionDependencies(destination);
  tearDown();

  if (result.code !== 0) {
    throw new Error('Failed to install composer dependencies.');
  }

  return true;
};

/**
 * Zip up a directory.
 *
 * @param {string} source
 * @param {string} destination
 * @returns {Promise}
 */
const zip = (source, destination) => archive.zip(source, destination);

export default {
  validate,
  createDirectory,
  copyFiles,
  installComposerDependencies,
  zip,
};
