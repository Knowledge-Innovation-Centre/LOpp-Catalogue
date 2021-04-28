<?php

namespace LearningOpportunitiesCatalogue\Common\PostTypes;

use Carbon_Fields\Container;
use Carbon_Fields\Field;
use Exception;
use LearningOpportunitiesCatalogue\Common\Meilisearch;
use MeiliSearch\Client;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( CatalogueSearchIndex::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class CatalogueSearchIndex {


		public static function delete_index( $post_ID ) {
			$searchIndex = Meilisearch::get_index( $post->post_type );
			$searchIndex->deleteDocument( $post_ID );
		}

		public static function update_index( $post_ID ) {

			$post = get_post( $post_ID );

			$searchIndex = Meilisearch::get_index( $post->post_type );


			$catalogItemIndex                 = [];
			$catalogItemIndex['id']           = $post->ID;
			$catalogItemIndex['post_title']   = $post->post_title;
			$catalogItemIndex['post_content'] = $post->post_content;
			$catalogItemIndex['guid']         = $post->guid;


			$allMeta = get_post_meta( $post->ID, '', true );
			$allMeta = array_map( function ( $n ) {
				return $n[0];
			}, $allMeta );


			$fields = CatalogueFields::get_general_fields();
			$fields = array_merge( $fields, CatalogueFields::get_learning_specification_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_contact_fields() );
			// $fields = array_merge( $fields, carbon_get_theme_option( 'loc_option_catalogue_fields' ) );

			foreach ( $fields as $field ) {

				$value = self::get_value( $post, $field, $allMeta );
				if ( ! is_array( $value ) ) {
					$catalogItemIndex[ $field['slug'] ] = $value;
					continue;
				}
				foreach ( $value as $key => $valueItem ) {

					$catalogItemIndex[ $key ] = $valueItem;
				}
			}

			$searchIndex->addDocuments( [ $catalogItemIndex ] );
		}

		private static function get_value( $post, $field, $allMeta ) {
			$value = $allMeta[ '_' . $field['slug'] ] ?? null;
			// if ( ! $value ) {
			// 	continue;
			// }

			if ( $field['type'] == 'date' ) {
				$value = strtotime( $value );
			}
			if ( isset( $field['subType'] ) && $field['subType'] == 'number' ) {
				$value = ( int ) $value;
			}
			if ( $field['type'] == 'association' ) {
				$relatedObjects = carbon_get_post_meta( $post->ID, $field['slug'] );
				$value          = [];

				foreach ( $relatedObjects as $key => $related_object ) {
					$allMetaRelatedObject = get_post_meta( $related_object["id"], '', true );
					$allMetaRelatedObject = array_map( function ( $n ) {
						return $n[0];
					}, $allMetaRelatedObject );


					$fieldsRelatedObject = $field['fields']::get_general_fields();
					foreach ( $fieldsRelatedObject as $fieldRelatedObject ) {
						$slugRelatedObject           = $field['slug'] . '.' . $related_object["id"] . '.' . $fieldRelatedObject['slug'];
						$value[ $slugRelatedObject ] = self::get_value( $fieldRelatedObject, $fieldRelatedObject, $allMetaRelatedObject );
					}
				}
			}

			return $value;
		}

	}
}
