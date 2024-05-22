<?php
/**
 * Plugin Name: Learning Opportunities Catalogue
 * Plugin URI: https://knowledgeinnovation.eu/
 * Description:
 * Version: 2.3.10
 * Requires at least: 4.7
 * Requires PHP: 5.5.9
 * Author: Jure Jager & Carmen L. Padron - Knowledge innovation
 * Author URI: https://atanas.dev/
 * License: GPL-2.0-only
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: learning_opportunities_catalogue
 * Domain Path: /languages
 *
 * YOU SHOULD NORMALLY NOT NEED TO ADD ANYTHING HERE - any custom functionality unrelated
 * to bootstrapping the theme should go into a service provider or a separate helper file
 * (refer to the directory structure in README.md).
 *
 * @package LearningOpportunitiesCatalogue
 */

if (! defined('ABSPATH')) {
	exit;
}

// Make sure we can load a compatible version of WP Emerge.
require_once __DIR__ . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'version.php';

$name = trim(get_file_data(__FILE__, ['Plugin Name'])[0]);
$load = learning_opportunities_catalogue_should_load_wpemerge($name, '0.16.0', '2.0.0');

if (! $load) {
	// An incompatible WP Emerge version is already loaded - stop further execution.
	// learning_opportunities_catalogue_should_load_wpemerge() will automatically add an admin notice.
	return;
}

define('LEARNING_OPPORTUNITIES_CATALOGUE_PLUGIN_FILE', __FILE__);

// Load composer dependencies.
if (file_exists(__DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php')) {
	require_once __DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
}

learning_opportunities_catalogue_declare_loaded_wpemerge($name, 'theme', __FILE__);

// Load helpers.
require_once __DIR__
			 . DIRECTORY_SEPARATOR
			 . 'app'
			 . DIRECTORY_SEPARATOR
			 . 'src'
			 . DIRECTORY_SEPARATOR
			 . 'LearningOpportunitiesCatalogue.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'helpers.php';

// Bootstrap plugin after all dependencies and helpers are loaded.
LearningOpportunitiesCatalogue::make()->bootstrap(require __DIR__
														  . DIRECTORY_SEPARATOR
														  . 'app'
														  . DIRECTORY_SEPARATOR
														  . 'config.php');

// Register hooks.
require_once __DIR__ . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'hooks.php';
