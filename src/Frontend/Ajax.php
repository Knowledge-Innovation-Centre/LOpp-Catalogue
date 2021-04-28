<?php

namespace LearningOpportunitiesCatalogue\Frontend;

use LearningOpportunitiesCatalogue\Common\Assets as Common_Assets;
use LearningOpportunitiesCatalogue\Common\PostTypes\Catalogue;
use LearningOpportunitiesCatalogue\Common\PostTypes\CatalogueFields;
use LearningOpportunitiesCatalogue\PluginData as PluginData;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Ajax::class ) ) {
	/**
	 * Enqueues the public-facing assets.
	 */
	class Ajax {

		/**
		 * @var Common_Assets
		 */
		var $common_assets;

		public function __construct() {

		}

		public function ajax_url() {
			echo '<script type="text/javascript">
           		var ajaxurl = "' . admin_url( 'admin-ajax.php' ) . '";
         	</script>';
		}

		public function get_xml_fields() {
			global $wpdb;
			$catalog = new Catalogue();

			$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_filter'";
			$options = $wpdb->get_results( $query, OBJECT_K );


			$filter_fields = [];

			$fields = CatalogueFields::get_general_fields();
			$fields = array_merge( $fields, CatalogueFields::get_learning_specification_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_contact_fields() );

			foreach ( $fields as $field ) {

				$slug       = '_' . $field['slug'];
				$slugFilter = '_' . $field['slug'] . '_filter';
				if ( ! isset( $options[ $slugFilter ] ) ) {
					continue;
				}
				if ( $options[ $slugFilter ]->option_value == 'disable' ) {
					continue;
				}
				if ( $options[ $slugFilter ]->option_value == 'slider' ) {

					$field['max'] = (float) $this->end_meta_value( $slug, 'max' );
					$field['min'] = (float) $this->end_meta_value( $slug, 'min' );
				}
				if ( $options[ $slugFilter ]->option_value == 'checkbox' ) {
					$field['values'] = $this->unique_meta_value( $slug );
				}
				$field['filter'] = $options[ $slugFilter ]->option_value;
				$filter_fields[] = $field;
			}

			echo json_encode( $filter_fields );

			die;

		}

		function end_meta_value( $meta, $end = "max" ) {
			global $wpdb;
			$query = $wpdb->prepare(
				"SELECT {$end}( cast( meta_value as UNSIGNED ) ) FROM {$wpdb->postmeta} WHERE meta_key='%s'",
				$meta
			);

			return $wpdb->get_var( $query );
		}

		function unique_meta_value( $meta ) {
			global $wpdb;
			$query = $wpdb->prepare(
				"SELECT DISTINCT meta_value FROM {$wpdb->postmeta} WHERE meta_key='%s'",
				$meta
			);

			$values = [];

			$results = $wpdb->get_results( $query, ARRAY_N );
			foreach ( $results as $result ) {
				if ( $result[0] && $result[0] != '' ) {

					$values[] = $result[0];
				}
			}

			return $values;
		}

		public function get_meilisearch_key() {
			echo json_encode( [
				'url' => carbon_get_theme_option( 'meilisearch_url' ),
				'key' => carbon_get_theme_option( 'meilisearch_key' )
			] );
			die;
		}


	}
}
