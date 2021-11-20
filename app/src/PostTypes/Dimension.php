<?php

namespace LearningOpportunitiesCatalogue\PostTypes;


// Abort if this file is called directly.
use Carbon_Fields\Container;
use Carbon_Fields\Field;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Dimension::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class Dimension {
		public $post_type = 'loc_dimension';
		const POST_TYPE = 'loc_dimension';

		public function register() {

			$enable_lmm = carbon_get_theme_option( 'enable_lmm' );

			if ( ! $enable_lmm ) {
				return;
			}
			register_extended_post_type( $this->post_type, [
				'menu_position'=> 52,], [
				'singular' => 'LMM dimension',
				'plural'   => 'LMM dimensions',
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
			         ->add_fields( [ Field::make( 'text', 'unique_id', __( "Unique ID" ) ) ] );
		}

	}
}
