/**
 * The external dependencies.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import pick from 'lodash/pick.js';
import {fileURLToPath} from "url";

/**
 * User config cache.
 */
let userConfig = null;


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

/**
 * API.
 */
export function rootPath(basePath = '', destPath = '') { return path.resolve(path.dirname(__dirname), '../../', basePath, destPath); }

export function srcPath(basePath = '', destPath = '') { return path.resolve(path.dirname(__dirname), '../', basePath, destPath); }

export function distPath(basePath = '', destPath = '') { return path.resolve(path.dirname(__dirname), '../../dist', basePath, destPath); }

export function srcScriptsPath(destPath) { return srcPath('scripts', destPath); }

export function srcStylesPath(destPath) { return srcPath('styles', destPath); }

export function srcImagesPath(destPath) { return srcPath('images', destPath); }

export function srcFontsPath(destPath) { return srcPath('fonts', destPath); }

export function srcVendorPath(destPath) { return srcPath('vendor', destPath); }

export function distScriptsPath(destPath) { return distPath('scripts', destPath); }

export function distStylesPath(destPath) { return distPath('styles', destPath); }

export function distImagesPath(destPath) { return distPath('images', destPath); }

export function distFontsPath(destPath) { return distPath('fonts', destPath); }

export const tests = {
  scripts: /\.(js|jsx)$/,
  styles: /\.(css|scss|sass)$/,
  svgs: /\.svg$/,
  images: /\.(ico|jpg|jpeg|png|svg|gif)$/,
  fonts: /\.(eot|ttf|woff|woff2)$/,
};

export function detectEnv() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const wpemergeEnv = process.env.WPEMERGE_ENV || '';
  const isCombined = !!process.env.WPEMERGE_COMBINED_BUILD;
  const isDevelopment = nodeEnv === 'development';
  const isHot = wpemergeEnv === 'hot';
  const isProduction = nodeEnv === 'production';
  const isDebug = wpemergeEnv === 'debug';

  return {
    isCombined,
    isDevelopment,
    isHot,
    isProduction,
    isDebug,
    filenameSuffix: isProduction && !isDebug ? '.min' : '',
  };
}

export function getWhitelistedUserConfig(config) {
  const whitelist = config.release.configWhitelist || [];
  return pick(config, whitelist);
}

export function getUserConfig(file, whitelisted = false) {
  const userConfigPath = file || path.join(process.cwd(), 'config.json');

  if (userConfig !== null) {
    return userConfig;
  }

  if (!fs.existsSync(userConfigPath)) {
    console.error('\x1B[31mCould not find your config.json file. Please make a copy of config.json.dist and adjust as needed.\x1B[0m');
    process.exit(1);
  }

  try {
    userConfig = JSON.parse(fs.readFileSync(userConfigPath));
  } catch (e) {
    console.error('\x1B[31mCould not parse your config.json file. Please make sure it is a valid JSON file.\x1B[0m');
    process.exit(1);
  }

  if (whitelisted) {
    return getWhitelistedUserConfig(userConfig);
  }

  return userConfig;
}

export function filehash(file) {
  const hash = crypto.createHash('sha1');
  hash.update(fs.readFileSync(file));
  return hash.digest('hex');
}

export function filehashFilter(file) { return `[name].${filehash(file).substr(0, 10)}.[ext]`; }
