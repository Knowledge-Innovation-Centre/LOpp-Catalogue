<?php


namespace LearningOpportunitiesCatalogue\PostTypes;

use Carbon_Fields\Field;
use LearningOpportunitiesCatalogue\CarbonFields\CarbonFieldsServiceProvider;

trait CarbonFieldsHelper {

	public static function get_carbon_fields( $type, $postType ) {
		$fields = [];
		global $wpdb;
		$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_required'";
		$options = $wpdb->get_results( $query, OBJECT_K );


		if ($type== 'additional_fields') {
			$carbonFields = carbon_get_theme_option( 'loc_option_catalogue_fields' );
		} else {
			$carbonFields = self::$type();
		}

		foreach ( $carbonFields as $field ) {
			if (!$field["slug"]) {
				continue;
			}
			if (!$field["title"]) {
				continue;
			}
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
			} elseif ( $field['type'] == 'complex' ) {
				$addField = Field::make(  $field["type"], $field["slug"], $field["title"] )
					->add_fields( $field['fields'] );
			} else {
				$addField = Field::make( $field["type"], $field["slug"], $field["title"] );
			}
			if (  isset( $field['field_type'])) {
				$addField = $addField->set_attribute('type', $field['field_type']);
			}
			$slug = '_' . $field['slug'] . '_'. $postType . '_required';

			if ( isset( $options[ $slug ] ) && $options[ $slug ]->option_value == 'yes' ) {
				$addField = $addField->set_required();
			}
			if ( isset(  $field['required'] ) &&  $field['required'] ) {
				$addField = $addField->set_required();
			}


			if (  isset( $field['hint'])) {
				$addField = $addField->set_help_text($field['hint']);
			}

			$fields[] = $addField;
		}

		return $fields;
	}

}
