<?php


namespace LearningOpportunitiesCatalogue\Common\PostTypes;

use Carbon_Fields\Field;

trait CarbonFieldsHelper {

	public static function get_carbon_fields( $type, $postType ) {
		$fields = [];
		global $wpdb;
		$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_required'";
		$options = $wpdb->get_results( $query, OBJECT_K );

		foreach ( self::$type() as $field ) {
			if ( $field['post_type'] ?? false ) {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] )->set_types( [
					[
						'type'      => 'post',
						'post_type' => $field['post_type'],
					]
				] );

				if ( $field['max'] ?? false ) {
					$addField = $addField->set_max( $field['max'] );
				}
			} elseif ( $field['type'] == 'date' ) {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] )->set_input_format( 'd.m.Y', 'd.m.Y' );
			} elseif ( $field['type'] == 'select' ) {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] )->add_options( $field["options"] );
			} else {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] );
			}
			$slug = '_' . $field['slug'] . '_'. $postType . '_required';

			if ( isset( $options[ $slug ] ) && $options[ $slug ]->option_value == 'yes' ) {
				$addField = $addField->set_required(true);
			}

			$fields[] = $addField;
		}

		return $fields;
	}

}