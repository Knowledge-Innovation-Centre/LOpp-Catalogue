<?php

namespace LearningOpportunitiesCatalogue;


// Abort if this file is called directly.
use LearningOpportunitiesCatalogue\PostTypes\Catalogue;
use LearningOpportunitiesCatalogue\PostTypes\CatalogueFields;
use LearningOpportunitiesCatalogue\PostTypes\CatalogueSearchIndex;
use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( AjaxFrontend::class ) ) {
	/**
	 * Enqueues the public-facing assets.
	 */
	class AjaxFrontend {

		public function __construct() {

		}

		public function ajax_url() {
			echo '<script type="text/javascript">
           		var ajaxurl = "' . admin_url( 'admin-ajax.php' ) . '";
         	</script>';
		}

		public function get_xml_fields() {
			global $wpdb;

			$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_filter'";
			$options = $wpdb->get_results( $query, OBJECT_K );


			$filter_fields = [];

			$fields = CatalogueFields::get_general_fields();
			$fields = array_merge( $fields, CatalogueFields::get_information_about_the_lopp_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_learning_specification_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_contact_fields() );

			foreach ( $fields as $field ) {

				$slug       = '_' . $field['slug'];
				$slugFilter = '_' . $field['slug'] . '_' . Catalogue::POST_TYPE . '_filter';
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
				if ( in_array($options[ $slugFilter ]->option_value, ['checkbox', 'dropdown']) ) {
					if ( isset( $field['options'] ) ) {
						$field['values'] = $field['options'];

					} else {
						$field['values'] = $this->unique_meta_value( $slug );
					}
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

					$values[ $result[0] ] = $result[0];
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

		public function reindex_items() {
			$args          = array(
				'post_type'        => Catalogue::POST_TYPE,
				'orderby'          => 'ID',
				'post_status'      => 'publish',
				'order'            => 'DESC',
				'suppress_filters' => true,
				'posts_per_page'   => - 1 // this will retrive all the post that is published
			);
			$catalog_items = new WP_Query( $args );

			CatalogueSearchIndex::delete_all_index( Catalogue::POST_TYPE );

			if ( $catalog_items->have_posts() ) {

				// Start looping over the query results.
				while ( $catalog_items->have_posts() ) {

					$catalog_items->the_post();

					CatalogueSearchIndex::update_index( get_the_ID() );
				}

			}

			wp_reset_postdata();

			echo 'reindex complete';
			die;
		}
		public function delete_index_items() {
			CatalogueSearchIndex::delete_all_index( Catalogue::POST_TYPE );

			wp_reset_postdata();

			echo 'delete complete';
			die;
		}


	}
}
