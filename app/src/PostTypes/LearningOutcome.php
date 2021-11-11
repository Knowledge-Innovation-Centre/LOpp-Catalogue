<?php

namespace LearningOpportunitiesCatalogue\PostTypes;

use Carbon_Fields\Container;
use Carbon_Fields\Field;
use Exception;
use LearningOpportunitiesCatalogue\PostTypes\LearningOutcomeFields;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( LearningOutcome::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class LearningOutcome {
		public $post_type = 'loc_learning_outcome';
		const POST_TYPE = 'loc_learning_outcome';

		public function register() {
			register_extended_post_type( $this->post_type, [
				'admin_cols' => $this->get_admin_cols(),
			], [

				# Override the base names used for labels:
				'singular' => 'Learning Outcome',
				'plural'   => 'Learning Outcomes',

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

			Container::make( 'post_meta', 'Catalogue item data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->set_priority( 'low' )
			         ->add_fields( LearningOutcomeFields::get_carbon_fields( 'get_general_fields',$this->post_type ) );

		}


	}
}
