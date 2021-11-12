<?php

namespace LearningOpportunitiesCatalogue\PostTypes;

// Abort if this file is called directly.
use Exception;
use WP_Query;

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


		private $importFailed = false;
		private $requiredFields = [];


		private function isWpmlInstalled(): bool {

			return defined( 'ICL_LANGUAGE_CODE' );
		}

		public function import() {
			global $wpdb;
			$xml_id = intval( $_POST['loc_xml_id'] );

			$url = wp_get_attachment_url( $xml_id );

			try {
				$xml = simplexml_load_file( $url );

				$uid = trim( (string) $xml->learningOpportunity_Identifier );
				$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_required'";
				$this->requiredFields = $wpdb->get_results( $query, OBJECT_K );

				$wpdb->query('START TRANSACTION');

				$post_id = $this->update_or_create_object( $uid, Catalogue::POST_TYPE, $xml->title, $xml->additionalNote, $xml->description );

				$this->import_general_data( $xml, $post_id );
				$this->import_information_about_the_lopp_data( $xml, $post_id );
				$this->import_learning_specification_data( $xml, $post_id );
				$this->import_contact_data( $xml, $post_id );

				if ($this->importFailed) {
					$wpdb->query('ROLLBACK');

					wp_send_json( false );
					return;
				}

				$wpdb->query('COMMIT');
				CatalogueSearchIndex::update_index( $post_id );
			} catch ( Exception $exception ) {
				var_dump( $exception );
			}
			wp_send_json( true );
		}

		public function import_maturity_model() {
			$xml_id = intval( $_POST['loc_xml_id'] );

			$url = wp_get_attachment_url( $xml_id );

			$xml = simplexml_load_file( $url );

			try {
				foreach ( $xml->dimension as $dimension ) {
					$post_type = Dimension::POST_TYPE;

					$unique_id = (string) $dimension['id'];
					$name      = (string) $dimension['name'];

					$dimension_id = $this->add_or_create_dimension_object( $post_type, $unique_id, $name );


					foreach ( $dimension->subset as $subset ) {
						$post_type = DimensionSubset::POST_TYPE;

						$subset_unique_id = (string) $subset['id'];
						$name             = (string) $subset['name'];
						$description      = (string) $subset->definition['text'];

						$subset_id = $this->add_or_create_dimension_object( $post_type, $subset_unique_id, $name, $description );

						carbon_set_post_meta( $subset_id, 'dimension', $dimension_id );

						$post_type = DimensionSubsetItem::POST_TYPE;

						$unique_id   = $subset_unique_id . '_explorer_knowledge';
						$name        = $subset_unique_id . ' Explorer knowledge';
						$description = (string) $subset->explorer->knowledge['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'explorer' );
						carbon_set_post_meta( $object_id, 'type', 'knowledge' );

						$unique_id   = $subset_unique_id . '_explorer_skills';
						$name        = $subset_unique_id . ' Explorer skills';
						$description = (string) $subset->explorer->skills['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'explorer' );
						carbon_set_post_meta( $object_id, 'type', 'skills' );

						$unique_id   = $subset_unique_id . '_explorer_attitudes';
						$name        = $subset_unique_id . ' Explorer attitudes';
						$description = (string) $subset->explorer->attitudes['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'explorer' );
						carbon_set_post_meta( $object_id, 'type', 'attitudes' );


						$unique_id   = $subset_unique_id . '_expert_knowledge';
						$name        = $subset_unique_id . ' Expert knowledge';
						$description = (string) $subset->expert->knowledge['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'expert' );
						carbon_set_post_meta( $object_id, 'type', 'knowledge' );

						$unique_id   = $subset_unique_id . '_expert_skills';
						$name        = $subset_unique_id . ' Expert skills';
						$description = (string) $subset->expert->skills['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'expert' );
						carbon_set_post_meta( $object_id, 'type', 'skills' );

						$unique_id   = $subset_unique_id . '_expert_attitudes';
						$name        = $subset_unique_id . ' Expert attitudes';
						$description = (string) $subset->expert->attitudes['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'expert' );
						carbon_set_post_meta( $object_id, 'type', 'attitudes' );

						$unique_id   = $subset_unique_id . '_pioneer_knowledge';
						$name        = $subset_unique_id . ' Pioneer knowledge';
						$description = (string) $subset->pioneer->knowledge['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'pioneer' );
						carbon_set_post_meta( $object_id, 'type', 'knowledge' );

						$unique_id   = $subset_unique_id . '_pioneer_skills';
						$name        = $subset_unique_id . ' Pioneer skills';
						$description = (string) $subset->pioneer->skills['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'pioneer' );
						carbon_set_post_meta( $object_id, 'type', 'skills' );

						$unique_id   = $subset_unique_id . '_pioneer_attitudes';
						$name        = $subset_unique_id . ' Pioneer attitudes';
						$description = (string) $subset->pioneer->attitudes['text'];
						$object_id   = $this->add_or_create_dimension_object( $post_type, $unique_id, $name, $description );
						carbon_set_post_meta( $object_id, 'dimension_subset', $subset_id );
						carbon_set_post_meta( $object_id, 'level', 'pioneer' );
						carbon_set_post_meta( $object_id, 'type', 'attitudes' );

					}

				}
			} catch ( Exception $exception ) {
				var_dump( $exception );
			}

			wp_send_json( true );
		}

		private function add_or_create_dimension_object( $post_type, $unique_id, $name, $description = "" ) {
			$args  = [
				'post_type'  => $post_type,
				'meta_key'   => '_unique_id',
				'meta_value' => $unique_id,
			];
			$query = get_posts( $args );

			$data   = array(
				'post_title'   => wp_strip_all_tags( $name ),
				'post_content' => $description,
				'post_type'    => $post_type,
				'post_status'  => 'publish',
			);
			$object = $query[0] ?? null;
			if ( $object ) {
				$data['ID'] = $object->ID;
			}


			$object_id = wp_insert_post( $data );

			carbon_set_post_meta( $object_id, 'unique_id', $unique_id );

			return $object_id;

		}

		private function update_or_create_object( $uid, $post_type, $xmlTitle, $xmlDescription, $xmlExcerpt = null ) {

			$args  = [
				'post_type'  => $post_type,
				'meta_key'   => '_unique_id',
				'meta_value' => $uid,
			];
			$query = get_posts( $args );

			$data = array(
				'post_title'   => wp_strip_all_tags( (string) $xmlTitle->text ),
				'post_content' => (string) $xmlDescription->text,
				'post_excerpt' => (string) $xmlExcerpt->text ?? null,
				'post_type'    => $post_type,
				'post_status'  => 'publish',
			);

			$original_post    = $query[0] ?? null;
			$original_post_id = null;

			if ( $original_post ) {
				$data['ID']       = $original_post->ID;
				$original_post_id = $original_post->ID;
			}

			$default_lang  = apply_filters( 'wpml_default_language', null );
			$file_language = (string) $xmlTitle->text->attributes()->lang ?? $default_lang;


			if ( $this->isWpmlInstalled() && $default_lang != $file_language ) {

				// create original post if not exists
				if ( ! $original_post ) {
					$original_post_id = wp_insert_post( [
						'post_title'  => $uid,
						'post_type'   => $post_type,
						'post_status' => 'publish',
					] );

					carbon_set_post_meta( $original_post_id, 'unique_id', $uid );

					$this->add_translation( $original_post_id, $post_type, $original_post_id, $file_language );
				}

				$translated_post = apply_filters( 'wpml_object_id', $original_post->ID, $post_type, false, $file_language );

				// prepare for new translation
				unset( $data['ID'] );

				if ( $translated_post ) {
					// translation already exists
					$data['ID'] = $translated_post;
				}
			}

			$post_id = wp_insert_post( $data );

			// connect translation
			if ( $this->isWpmlInstalled() ) {
				$this->add_translation( $post_id, $post_type, $original_post_id, $file_language );
			}

			return $post_id;
		}

		private function add_translation( $post_id, $post_type, $original_post_id, $language ) {
			$wpml_element_type = apply_filters( 'wpml_element_type', $post_type );
			$default_lang      = apply_filters( 'wpml_default_language', null );

			// get the language info of the original post
			// https://wpml.org/wpml-hook/wpml_element_language_details/
			$get_language_args           = array(
				'element_id'   => $original_post_id,
				'element_type' => $post_type
			);
			$original_post_language_info = apply_filters( 'wpml_element_language_details', null, $get_language_args );

			$set_language_args = array(
				'element_id'           => $post_id,
				'element_type'         => $wpml_element_type,
				'trid'                 => $original_post_language_info->trid,
				'language_code'        => $language,
				'source_language_code' => $default_lang
			);


			do_action( 'wpml_set_element_language_details', $set_language_args );
		}

		private function import_general_data( $xml_item, $post_id ) {
			foreach ( CatalogueFields::get_general_fields() as $field ) {
				$this->update_post_field( $post_id, $xml_item, $field );
			}
		}

		private function import_information_about_the_lopp_data( $xml_item, $post_id ) {
			foreach ( CatalogueFields::get_information_about_the_lopp_fields() as $field ) {
				$this->update_post_field( $post_id, $xml_item, $field );
			}
		}

		private function import_learning_specification_data( $xml_item, $post_id ) {
			foreach ( CatalogueFields::get_learning_specification_fields() as $field ) {
				$this->update_post_field( $post_id, $xml_item, $field );
			}
		}

		private function import_contact_data( $xml_item, $post_id ) {
			foreach ( CatalogueFields::get_contact_fields() as $field ) {
				$this->update_post_field( $post_id, $xml_item, $field );
			}
		}

		private function get_value( $xmlData, $field ) {
			if ( $field['type'] == 'association' ) {

				return $this->update_related_fields( $xmlData, $field );
			}

			$field_key = $field['xml_slug'] ?? $field['slug'];
			if ( strpos( $field_key, '.' ) !== false ) {
				$data = $this->get_deep_value( $xmlData, $field );
			} else {
				if ( ! isset( $xmlData->$field_key ) ) {
					return null;
				}
				$data = $xmlData->$field_key;

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

		private function update_related_fields( $xmlData, $field ) {

			$nestedData = $xmlData;
			$deep_keys  = explode( '.', $field['prefix'] );

			foreach ( $deep_keys as $deep_key ) {
				if ( ! isset( $nestedData->$deep_key ) ) {
					return null;
				}

				$nestedData = $nestedData->$deep_key;
			}

			foreach ( $nestedData as $nested_data_item ) {
				$uid     = trim( (string) $nested_data_item->id );
				$post_id = $this->update_or_create_object( $uid, $field['post_type'], $nested_data_item->title, $nested_data_item->description );

				foreach ( $field['fields']::get_general_fields() as $relatedField ) {

					$this->update_post_field( $post_id, $nested_data_item, $relatedField );
				}
			}
		}

		private function update_post_field( $post_id, $xmlData, $field ) {

			if ( $field['custom_update'] ) {
				$field['custom_update']( $xmlData, $post_id );

				return;
			}

			$value = $this->get_value( $xmlData, $field );

			if ( $value === null ) {
				$value = "";
			}

			$slug = '_' . $field['slug'] . '_'. get_post_type($post_id) . '_required';

			if ( (!$value || $value == "") && isset( $this->requiredFields[ $slug ] ) && $this->requiredFields[ $slug ]->option_value == 'yes' ) {
				$this->importFailed = true;
			}

			carbon_set_post_meta( $post_id, $field['slug'], $value );
		}
	}
}
