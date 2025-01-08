<?php

namespace LearningOpportunitiesCatalogue\PostTypes;

use Exception;
use KicMeilisearch\Meilisearch;

if (!defined('ABSPATH')) {
	exit;
}

if (!class_exists(CatalogueSearchIndex::class)) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class CatalogueSearchIndex
	{
		public static function delete_index($post)
		{
			try {
				if (!Meilisearch::health()) {
					return false;
				}

				if (is_numeric($post)) {
					$post = get_post($post);
				}

				$searchIndex = Meilisearch::get_index();
				$searchIndex->deleteDocument($post->ID);
			} catch (Exception $e) {
				return false;
			}
		}

		public static function delete_all_index()
		{
			try {
				$client = Meilisearch::get_client();
				$client->index(carbon_get_theme_option('meilisearch_index_key'))->deleteAllDocuments();
			} catch (Exception $e) {
				return false;
			}
		}

		public static function update_index($post_ID)
		{
			try {
				$post = get_post($post_ID);
				if (!Meilisearch::health()) {
					return false;
				}

				$searchIndex = Meilisearch::get_index();

				$current_post_status = get_post_status($post);

				if ($current_post_status != 'publish') {
					self::delete_index($post);

					return true;
				}

				$catalogItemIndex = [];
				$catalogItemIndex['id'] = $post->ID;
				$catalogItemIndex['post_title'] = $post->post_title;
				$catalogItemIndex['post_content'] = strip_tags($post->post_content);
				$catalogItemIndex['guid'] = get_permalink($post);
				if (has_post_thumbnail($post->ID)) {
					$feat_image = wp_get_attachment_url(get_post_thumbnail_id($post->ID));

					$catalogItemIndex['featured_image'] = $feat_image;
				}

				$allMeta = get_post_meta($post->ID, '', true);
				$allMeta = array_map(function ($n) {
					return $n[0];
				}, $allMeta);

				$fields = CatalogueFields::get_general_fields();
				$fields = array_merge($fields, CatalogueFields::get_information_about_the_lopp_fields());
				$fields = array_merge($fields, CatalogueFields::get_learning_specification_fields());
				$fields = array_merge($fields, CatalogueFields::get_contact_fields());
				$fields = array_merge($fields, carbon_get_theme_option('loc_option_catalogue_fields'));

				$learningOutcomes = carbon_get_post_meta($post->ID, 'learning_outcome');

				$subsetIds = [];

				foreach ($learningOutcomes as $learningOutcome) {
					$relatedObjects = carbon_get_post_meta($learningOutcome['id'], 'dimension_subset_item');

					foreach ($relatedObjects as $related_object) {
						$subsetIds[] = $related_object["id"];
					}
				}
				$catalogItemIndex['loc_subset_items'] = $subsetIds;

				$catalogItemIndex = self::getIndex($post, $fields, $catalogItemIndex, $allMeta);

				return $searchIndex->addDocuments([$catalogItemIndex], 'id');
			} catch (Exception $e) {
				var_dump($e);
			}
		}

		private static function getIndex($post, $fields, $catalogItemIndex, $allMeta)
		{
			foreach ($fields as $field) {
				$value = self::get_value($post, $field, $allMeta);
				if (!is_array($value)) {
					if (is_numeric($value)) {
						$value = (float)$value;
					}

					$catalogItemIndex[$field['slug']] = $value;
					continue;
				}
				foreach ($value as $key => $valueItem) {
					$catalogItemIndex[$key] = $valueItem;
				}
			}

			return $catalogItemIndex;
		}

		private static function get_value($post, $field, $allMeta)
		{
			$value = $allMeta['_' . $field['slug']] ?? null;
			// if ( ! $value ) {
			// 	continue;
			// }

			if (!isset($post->ID)) {
				return;
			}

			if ($field['type'] == 'date') {
				$value = strtotime($value);
			}
			if (isset($field['subType']) && $field['subType'] == 'number') {
				$value = ( int )$value;
			}
			if ($field['type'] == 'association') {
				$relatedObjects = carbon_get_post_meta($post->ID, $field['slug']);
				$value = [];

				foreach ($relatedObjects as $key => $related_object) {
					$allMetaRelatedObject = get_post_meta($related_object["id"], '', true);
					$allMetaRelatedObject = array_map(function ($n) {
						return $n[0];
					}, $allMetaRelatedObject);

					$fieldsRelatedObject = $field['fields']::get_general_fields();
					foreach ($fieldsRelatedObject as $fieldRelatedObject) {
						$slugRelatedObject = $field['slug']
							. '.'
							. $related_object["id"]
							. '.'
							. $fieldRelatedObject['slug'];
						$value[$slugRelatedObject] = self::get_value($fieldRelatedObject, $fieldRelatedObject, $allMetaRelatedObject);
					}
				}
			}

			return $value;
		}
	}
}
