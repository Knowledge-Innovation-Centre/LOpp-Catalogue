<?php

namespace LearningOpportunitiesCatalogue\Common\PostTypes;

use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Describer::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class Describer {
		public $post_type = 'loc_describer';

		public function register() {
			register_extended_post_type( $this->post_type, [
				'admin_cols' => $this->get_admin_cols(),
			], [

				# Override the base names used for labels:
				'singular' => 'Describer',
				'plural'   => 'Describers',

			] );

		}

		public function get_admin_cols() {
			return [
				'unique_id' => [
					'title'    => 'Unique ID',
					'meta_key' => '_unique_id',
				],
			];

		}

		public function custom_fields() {
			Container::make( 'post_meta', 'Describer additional data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->add_fields( [
				         Field::make( "text", "unique_id", __( "Unique ID" ) ),
			         ] );
		}

	}
}
