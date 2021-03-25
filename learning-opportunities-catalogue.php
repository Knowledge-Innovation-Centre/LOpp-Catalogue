<?php
/**
 * The plugin bootstrap file.
 *
 * Introduction to the structure of this plugin's files:
 *
 * learning-opportunities-catalogue/src/class-PluginData.php - hard-coded information about the plugin, such as plugin-slug and plugin_slug.
 * learning-opportunities-catalogue/src/class-Bootstrap.php - gets the plugin going, including setting required/recommended plugin dependencies
 *
 * learning-opportunities-catalogue/src/Frontend - public-facing functionality
 * learning-opportunities-catalogue/src/Admin - admin-specific functionality
 * learning-opportunities-catalogue/src/Common - functionality shared between the admin area and the public-facing parts
 *
 * learning-opportunities-catalogue/src/Common/Utilities - generic functions for things like debugging, processing multidimensional arrays, handling datetimes, etc.
 * learning-opportunities-catalogue/src/Core - plugin core to register hooks, load files etc
 * learning-opportunities-catalogue/src/Customizer - WordPress Customizer functionality
 * learning-opportunities-catalogue/src/Shortcodes - where to create and enable/disable new shortcodes
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @package           LearningOpportunitiesCatalogue
 *
 * @wordpress-plugin
 * Plugin Name:       Learning Opportunities Catalogue
 * Plugin URI:        https://knowledgeinnovation.eu/learning-opportunities-catalogue/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Jure Jager - Knowledge Innovation
 * Author URI:        https://knowledgeinnovation.eu/
 * License:           GPL version 3 or any later version
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       learning-opportunities-catalogue
 * Domain Path:       /languages
 *
 */

// Cannot `declare( strict_types=1 );` to avoid fatal if prior to PHP 7.0.0, since we did not yet verify the PHP version.

namespace LearningOpportunitiesCatalogue;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Autoloading, via Composer.
 *
 * @link https://getcomposer.org/doc/01-basic-usage.md#autoloading
 */
require_once( 'vendor/autoload.php' );

// Define Constants

/**
 * Register Activation and Deactivation Hooks
 * This action is documented in src/Core/class-Activator.php
 */
register_activation_hook( __FILE__, [ __NAMESPACE__ . '\Core\Activator', 'activate' ] );

/**
 * The code that runs during plugin deactivation.
 * This action is documented src/Core/class-Deactivator.php
 */
register_deactivation_hook( __FILE__, [ __NAMESPACE__ . '\Core\Deactivator', 'deactivate' ] );

// Begin execution of the plugin.
( new Bootstrap() )->init();


add_action( 'wp_ajax_loc_catalog_import_xml', function () {
// this is required to terminate immediately and return a proper response
} );

add_action( 'wp_ajax_loc_describers_import_xml', function () {

	$xmlId = intval( $_POST['loc_xml_id'] );

	$url = wp_get_attachment_url( $xmlId );

	$xml = simplexml_load_file( $url );


	foreach ( $xml->Describer as $describer ) {

		$args  = [
			'post_type'  => 'loc_describer',
			'meta_key'   => 'loc_unique_id',
			'meta_value' => (string) $describer->Id,
		];
		$query = get_posts( $args );

		$data = array(
			'post_title'   => wp_strip_all_tags( (string) $describer->Title ),
			'post_content' => (string) $describer->Description,
			'post_type'    => 'loc_describer',
			'post_status'  => 'publish',
		);

		if ( $query[0] ?? false ) {
			$data['ID'] = $query[0]->ID;
		}

		$describer_id = wp_insert_post( $data );

		update_post_meta( $describer_id, 'loc_unique_id', (string) $describer->Id );

		foreach ( $describer->Knowledge->KnowledgeItem as $knowledge ) {
			$args  = [
				'post_type'  => 'loc_knowledge',
				'meta_key'   => 'loc_unique_id',
				'meta_value' => (string) $knowledge->Id,
			];
			$query = get_posts( $args );

			$data = array(
				'post_title'   => wp_strip_all_tags( (string) $knowledge->Title ),
				'post_content' => (string) $knowledge->Description,
				'post_type'    => 'loc_knowledge',
				'post_status'  => 'publish',
			);

			if ( $query[0] ?? false ) {
				$data['ID'] = $query[0]->ID;
			}

			$knowledge_id = wp_insert_post( $data );

			update_post_meta( $knowledge_id, 'loc_unique_id', (string) $knowledge->Id );
			update_post_meta( $knowledge_id, 'level', (string) $knowledge->Level );
			update_post_meta( $knowledge_id, 'loc_describer_id', $describer_id );
		}

		foreach ( $describer->Skills->Skill as $skill ) {
			$args  = [
				'post_type'  => 'loc_skill',
				'meta_key'   => 'loc_unique_id',
				'meta_value' => (string) $skill->Id,
			];
			$query = get_posts( $args );

			$data = array(
				'post_title'   => wp_strip_all_tags( (string) $skill->Title ),
				'post_content' => (string) $skill->Description,
				'post_type'    => 'loc_skill',
				'post_status'  => 'publish',
			);

			if ( $query[0] ?? false ) {
				$data['ID'] = $query[0]->ID;
			}

			$skill_id = wp_insert_post( $data );

			update_post_meta( $skill_id, 'loc_unique_id', (string) $skill->Id );
			update_post_meta( $skill_id, 'level', (string) $skill->Level );
			update_post_meta( $skill_id, 'loc_describer_id', $describer_id );
		}

		foreach ( $describer->Attitudes->Attitude as $attitude ) {
			var_dump( $attitude );
			$args  = [
				'post_type'  => 'loc_attitude',
				'meta_key'   => 'loc_unique_id',
				'meta_value' => (string) $attitude->Id,
			];
			$query = get_posts( $args );

			$data = array(
				'post_title'   => wp_strip_all_tags( (string) $attitude->Title ),
				'post_content' => (string) $attitude->Description,
				'post_type'    => 'loc_attitude',
				'post_status'  => 'publish',
			);

			if ( $query[0] ?? false ) {
				$data['ID'] = $query[0]->ID;
			}

			$attitude_id = wp_insert_post( $data );

			update_post_meta( $attitude_id, 'loc_unique_id', (string) $attitude->Id );
			update_post_meta( $attitude_id, 'level', (string) $attitude->Level );
			update_post_meta( $attitude_id, 'loc_describer_id', $describer_id );
		}

	}

	wp_die( count( $xml->CatalogueItem ) ); // this is required to terminate immediately and return a proper response
} );

