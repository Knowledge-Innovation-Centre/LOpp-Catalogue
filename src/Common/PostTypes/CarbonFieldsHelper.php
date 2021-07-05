<?php


namespace LearningOpportunitiesCatalogue\Common\PostTypes;

use Carbon_Fields\Field;

trait CarbonFieldsHelper {

	public static function get_carbon_fields( $type ) {
		$fields = [];
		foreach ( self::$type() as $field ) {
			if ( $field['post_type'] ?? false ) {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] )->set_types( [
					[
						'type'      => 'post',
						'post_type' => $field['post_type'],
					]
				] );

				if ( $field['max'] ?? false ) {
					$addField->set_max( $field['max'] );
				}
			} elseif ( $field['type'] == 'date' ) {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] )->set_input_format( 'd.m.Y', 'd.m.Y' );
			} elseif ( $field['type'] == 'select' ) {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] )->add_options( $field["options"] );
			} else {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] );
			}
			$fields[] = $addField;
		}

		return $fields;
	}

}
