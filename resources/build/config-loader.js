/**
 * The external dependencies.
 */
import {dirname, join} from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename);
export default {
  loader: join(__dirname, 'lib', 'config-loader.js'),
  options: {
    sassOutput: 'resources/styles/[name].config.scss',
  },
};
