<?php

namespace LearningOpportunitiesCatalogue\Common\PostTypes;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( CatalogueImporter::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class CatalogueImporter {

		private $catalog_item_index = [];

		public function __construct() {
		}

		public function import() {
			$xmlId = intval( $_POST['loc_xml_id'] );

			$url = wp_get_attachment_url( $xmlId );

			$xml = simplexml_load_file( $url );

			$limit = 1;

			$current_import_file_id = get_option( 'loc_current_import_file_id', null );
			$offset                 = (int) get_option( 'loc_import_offset', 0 );

			if ( ! $current_import_file_id ) {
				update_option( 'loc_current_import_file_id', $xmlId );
				update_option( 'loc_import_offset', 0 );
			}

			// sleep( 2 );
			$index = 0;


			$catalogItemsIndex = [];

			$xml_item = $xml;
			// foreach ( $xml->learningOpportunity as $xml_item ) {

			$index ++;

			// if ( $index <= $offset ) {
			// 	continue;
			// }
			//
			// if ( $index == ( $offset + $limit ) ) {
			// 	update_option( 'loc_import_offset', $offset + $limit );
			// 	break;
			// }

			$args  = [
				'post_type'  => 'loc_catalogue_item',
				'meta_key'   => '_unique_id',
				'meta_value' => trim( (string) $xml_item->learningOpportunity_Identifier ),
			];
			$query = get_posts( $args );

			$data = array(
				'post_title'   => wp_strip_all_tags( (string) $xml_item->title->text ),
				'post_content' => (string) $xml_item->additionalNote->text,
				'post_excerpt' => (string) $xml_item->description->text,
				'post_type'    => 'loc_catalogue_item',
				'post_status'  => 'publish',
			);

			if ( $query[0] ?? false ) {
				$data['ID'] = $query[0]->ID;
			}


			$post_id = wp_insert_post( $data );

			$this->import_general_data( $xml_item, $post_id );
			$this->import_learning_specification_data( $xml_item, $post_id );
			$this->import_contact_data( $xml_item, $post_id );
			// $this->import_additional_data( $xml_item, $post_id );


			CatalogueSearchIndex::update_index( $post_id );
			// }


			$response = [];

			$response['index'] = $index;
			$response['count'] = $xml->count();
			// $response['status']   = 'in_progress';
			$response['status']   = 'finished';
			$response['progress'] = $index / $xml->count() * 100;


			if ( $index >= $xml->count() ) {
				$response['status']   = 'finished';
				$response['progress'] = 100;

				update_option( 'loc_current_import_file_id', null );
				update_option( 'loc_import_offset', 0 );
			}

			wp_send_json( $response );
		}

		private function import_general_data( $xml_item, $post_id ) {
			foreach ( CatalogueFields::get_general_fields() as $field ) {
				$value = $this->update_post_field( $post_id, $xml_item, $field );
			}
		}

		private function import_learning_specification_data( $xml_item, $post_id ) {
			foreach ( CatalogueFields::get_learning_specification_fields() as $field ) {
				$value = $this->update_post_field( $post_id, $xml_item, $field );
			}
		}

		private function import_contact_data( $xml_item, $post_id ) {
			foreach ( CatalogueFields::get_contact_fields() as $field ) {
				$value = $this->update_post_field( $post_id, $xml_item, $field );
			}
		}

		// private function import_additional_data( $xml_item, $post_id ) {
		// 	$data = $xml_item->additional;
		//
		// 	$catalog_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );
		//
		// 	foreach ( $catalog_fields as $field ) {
		// 		$value = $this->update_post_field( $post_id, $data, $field );
		// 	}
		// }

		private function get_value( $xmlData, $field ) {
			if ( $field['type'] == 'association' ) {
				return $this->get_related_ids( $xmlData, $field );
			}

			$field_key = $field['xml_slug'] ?? $field['slug'];
			if ( strpos( $field_key, '.' ) !== false ) {
				$data = $this->get_deep_value( $xmlData, $field );
			} else {
				if ( ! isset( $xmlData->$field_key ) ) {
					return null;
				}
				$data = $xmlData->$field_key;
				if ( $field['xml_key'] ?? false ) {

					$data = $xmlData->$field_key[ $field['xml_key'] ];
				}
			}

			if ( isset( $data->text ) ) {
				$data = $data->text;
			}
			if ( ! $data ) {
				return null;
			}

			if ( (string) $data->attributes()->url ) {
				return file_get_contents( trim( (string) $data->attributes()->url ) );
			}

			return trim( $data );
		}

		private function get_deep_value( $xmlData, $field ) {
			$field_key = $field['xml_slug'] ?? $field['slug'];
			$deep_keys = explode( '.', $field_key );
			foreach ( $deep_keys as $deep_key ) {
				if ( ! isset( $xmlData->$deep_key ) ) {

					return null;
				}

				$xmlData = $xmlData->$deep_key;
			}

			if ( $field['xml_key'] ?? false ) {

				return $xmlData[ $field['xml_key'] ];
			}

			return $xmlData;
		}

		private function get_related_ids( $xmlData, $field ) {
			$post_ids = [];

			$nestedData = $xmlData;
			$deep_keys  = explode( '.', $field['prefix'] );
			foreach ( $deep_keys as $deep_key ) {
				if ( ! isset( $nestedData->$deep_key ) ) {
					return null;
				}

				$nestedData = $nestedData->$deep_key;
			}

			foreach ( $nestedData as $nested_data_item ) {

				$args  = [
					'post_type'  => $field['post_type'],
					'meta_key'   => '_unique_id',
					'meta_value' => trim( (string) $nested_data_item->id ),
				];
				$query = get_posts( $args );

				$data = array(
					'post_title'   => wp_strip_all_tags( (string) $nested_data_item->title->text ),
					'post_content' => (string) $nested_data_item->description->text,
					'post_type'    => $field['post_type'],
					'post_status'  => 'publish',
				);

				if ( $query[0] ?? false ) {
					$data['ID'] = $query[0]->ID;
				}


				$post_id    = wp_insert_post( $data );
				$post_ids[] = $post_id;
				foreach ( $field['fields']::get_general_fields() as $relatedField ) {
					$value = $this->update_post_field( $post_id, $nested_data_item, $relatedField );
				}
			}
		}

		private function update_post_field( $post_id, $xmlData, $field ) {
			$value = $this->get_value( $xmlData, $field );

			if ( $value === null ) {
				$value = "";
			}

			carbon_set_post_meta( $post_id, $field['slug'], $value );
		}
	}
}
