<?php

namespace LearningOpportunitiesCatalogue\PostTypes;


// Abort if this file is called directly.
use Carbon_Fields\Container;
use Carbon_Fields\Field;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( DimensionSubset::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class DimensionSubset {
		public $post_type = 'loc_dimension_subset';
		const POST_TYPE = 'loc_dimension_subset';

		public function register() {
			$enable_lmm = carbon_get_theme_option( 'enable_lmm' );
			if ( ! $enable_lmm ) {
				return;
			}
			register_extended_post_type( $this->post_type, [], [
				'singular' => 'LMM dimension subset',
				'plural'   => 'LMM dimension subsets',
			] );

		}

		public function custom_fields() {
			$enable_lmm = carbon_get_theme_option( 'enable_lmm' );
			if ( ! $enable_lmm ) {
				return;
			}
			Container::make( 'post_meta', 'Additional data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->set_priority( 'low' )
			         ->add_fields( [
				         Field::make( 'text', 'unique_id', __( "Unique ID" ) ),
				         Field::make( 'association', 'dimension', __( 'Dimension' ) )
				              ->set_types( array(
					              array(
						              'type'      => 'post',
						              'post_type' => Dimension::POST_TYPE,
					              )
				              ) )
			         ] );
		}
	}
}
