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

	public static function get_filter_fields() {
		global $wpdb;

		$fields = CatalogueFields::get_general_fields();
		$fields = array_merge( $fields, CatalogueFields::get_learning_specification_fields() );
		$fields = array_merge( $fields, CatalogueFields::get_contact_fields() );

		$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_filter'";
		$options = $wpdb->get_results( $query, OBJECT_K );


		$filter_fields = [];

		foreach ( $fields as $field ) {
			$slug = '_' . $field['slug'] . '_filter';
			if ( ! isset( $options[ $slug ] ) ) {
				continue;
			}
			if ( $options[ $slug ]->option_value == 'disable' ) {
				continue;
			}
			$field['filter_type'] = $options[ $slug ]->option_value;

			$filter_fields[] = $field;
		}


		// $loc_option_catalogue_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );
		//
		// foreach ( $loc_option_catalogue_fields as $loc_option_catalogue_field ) {
		//
		// 	if ( ! $loc_option_catalogue_field['filter'] ) {
		// 		continue;
		// 	}
		// 	if ( $loc_option_catalogue_field['filter'] == 'disabled' ) {
		// 		continue;
		// 	}
		// 	$filter_fields[] = $loc_option_catalogue_field;
		// }

		return $filter_fields;

	}

	public static function get_searchable_fields() {
		global $wpdb;

		$fields = CatalogueFields::get_general_fields();
		$fields = array_merge( $fields, CatalogueFields::get_learning_specification_fields() );
		$fields = array_merge( $fields, CatalogueFields::get_contact_fields() );

		$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_searchable'";
		$options = $wpdb->get_results( $query, OBJECT_K );

		$searchable_fields = [];

		foreach ( $fields as $field ) {
			$slug = '_' . $field['slug'] . '_searchable';
			if ( ! isset( $options[ $slug ] ) ) {
				continue;
			}
			if ( $options[ $slug ]->option_value == 0 || $options[ $slug ]->option_value == '0' ) {
				continue;
			}
			$field['searchable'] = $options[ $slug ]->option_value;
			$searchable_fields[] = $field;
		}

		// $loc_option_catalogue_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );
		//
		// foreach ( $loc_option_catalogue_fields as $loc_option_catalogue_field ) {
		//
		// 	if ( ! $loc_option_catalogue_field['searchable'] ) {
		// 		continue;
		// 	}
		// 	if ( $loc_option_catalogue_field['searchable'] == 0 || $loc_option_catalogue_field['searchable'] == '0' ) {
		// 		continue;
		// 	}
		// 	$searchable_fields[] = $loc_option_catalogue_field;
		// }

		usort( $searchable_fields, function ( $item1, $item2 ) {
			return (float) $item1['searchable'] <=> (float) $item2['searchable'];
		} );

		return $searchable_fields;

	}
}
