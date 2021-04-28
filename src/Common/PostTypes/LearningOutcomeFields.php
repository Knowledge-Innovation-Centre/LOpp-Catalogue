<?php

namespace LearningOpportunitiesCatalogue\Common\PostTypes;

use Carbon_Fields\Field;
use LearningOpportunitiesCatalogue\Common\PostTypes\CarbonFieldsHelper;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( LearningOutcomeFields::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class LearningOutcomeFields {
		use CarbonFieldsHelper;

		public static function get_general_fields() {
			$prefix = '';

			return [
				[
					'type'     => 'text',
					'slug'     => 'unique_id',
					'xml_slug' => $prefix . 'id',
					'title'    => __( 'Learing outcome ID' )
				],

				[
					'type'     => 'text',
					'slug'     => 'learning_outcome_type',
					'xml_slug' => $prefix . 'learningOutcomeType',
					'title'    => __( 'Learing outcome type' )
				],
				[
					'type'     => 'text',
					'slug'     => 'reusability_level',
					'xml_slug' => $prefix . 'reusabiltyLevel',
					'title'    => __( 'Reusability level' )
				],
				[
					'type'     => 'text',
					'slug'     => 'dimension',
					'xml_slug' => $prefix . 'relatedSkill',
					'xml_key'  => 0,
					'title'    => __( 'Dimension' )
				],
				[
					'type'     => 'text',
					'slug'     => 'knowledge',
					'xml_slug' => $prefix . 'relatedSkill',
					'xml_key'  => 1,
					'title'    => __( 'Knowledge' )
				],
				[
					'type'     => 'text',
					'slug'     => 'skill',
					'xml_slug' => $prefix . 'relatedSkill',
					'xml_key'  => 2,
					'title'    => __( 'Skill' )
				],
				[
					'type'     => 'text',
					'slug'     => 'attitude',
					'xml_slug' => $prefix . 'relatedSkill',
					'xml_key'  => 3,
					'title'    => __( 'Attitude' )
				],
			];
		}

		public static function get_carbon_fields( $type ) {
			$fields = [];
			foreach ( self::$type() as $field ) {
				if ( $field['post_type'] ?? false ) {
					$fields[] = Field::make( $field["type"], $field["slug"], $field["title"] )->set_types( [
						[
							'type'      => 'post',
							'post_type' => $field['post_type'],
						]
					] );
				} elseif ( $field['type'] == 'date' ) {
					$fields[] = Field::make( $field["type"], $field["slug"], $field["title"] )->set_input_format( 'd.m.Y', 'd.m.Y' );;
				} else {
					$fields[] = Field::make( $field["type"], $field["slug"], $field["title"] );
				}
			}

			return $fields;
		}

	}
}
