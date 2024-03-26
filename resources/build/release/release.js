/**
 * The external dependencies.
 */
import process from 'process';
import path from 'path';
import EventEmitter from 'events';

/**
 * The internal dependencies.
 */
import {rootPath} from '../lib/utils.js';
import config from '../../../config.json' assert {type: 'json'};
import steps from './steps.js';

const { log, error: logError } = console;
const name = process.argv[2] || 'wpemerge-release';
const source = rootPath();
const destination = path.join(path.dirname(source), name);
const emitter = new EventEmitter();

emitter.on('file.copy', (file) => process.stdout.write(`Copying ${path.relative(source, file)} ...`));
emitter.on('file.copied', () => log(' done'));

(new Promise((resolve) => resolve()))
  .then(() => {
    steps.validate(destination);

    steps.createDirectory(destination);

    steps.copyFiles(config.release.include, source, destination, emitter);

    log('Installing production composer dependencies ...');
    steps.installComposerDependencies(source, destination);

    return steps.zip(destination, `${destination}.zip`);
  })
  .catch((e) => logError(e.message));
