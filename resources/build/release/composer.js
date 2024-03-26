/**
 * The external dependencies.
 */
import shell from 'shelljs';

/**
 * Install production-only dependencies in the current directory.
 *
 * @returns {Object}
 */
const installProductionDependencies = (cwd = null) => shell.exec('composer install --no-dev --classmap-authoritative', { cwd });

export default {
  installProductionDependencies,
};
