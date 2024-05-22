<?php

namespace LearningOpportunitiesCatalogue\PostTypes;

// Abort if this file is called directly.
if (! defined('ABSPATH')) {
	exit;
}

if (! class_exists(LearningOutcomeFields::class)) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class LearningOutcomeFields
	{
		use CarbonFieldsHelper;

		public static function get_general_fields()
		{
			$prefix = '';

			$general_fields = [
				[
					'type'     => 'text',
					'slug'     => 'unique_id',
					'xml_slug' => $prefix . 'id',
					'title'    => __('Learning outcome ID'),
				],

				[
					'type'     => 'text',
					'slug'     => 'learning_outcome_type',
					'xml_slug' => $prefix . 'learningOutcomeType',
					'title'    => __('Learning outcome type'),
				],
				[
					'type'     => 'text',
					'slug'     => 'reusability_level',
					'xml_slug' => $prefix . 'reusabiltyLevel',
					'title'    => __('Reusability level'),
				],
				[
					'type'     => 'text',
					'slug'     => 'related_skill',
					'xml_slug' => $prefix . 'relatedSkill',
					'title'    => __('Related skill'),
				],
				//[
				//	'type'          => 'complex',
				//	'slug'          => 'learning_maturity_model_skills',
				//	'xml_slug'      => $prefix . 'relatedSkill',
				//	'title'         => __( 'Dimension' ),
				//	'fields'        => [
				//		Field::make( 'text', 'dimension', __( 'Dimension' ) ),
				//		Field::make( 'text', 'knowledge', __( 'Knowledge' ) ),
				//		Field::make( 'text', 'skill', __( 'Skill' ) ),
				//		Field::make( 'text', 'attitude', __( 'Attitude' ) ),
				//	],
				//					'custom_update' => function ( $xmlData, $post_id ) {
				//						$items = [];
				//						$item  = [];
				//
				//						$enable_lmm = carbon_get_theme_option( 'enable_lmm' );
				//						if ( $enable_lmm ) {
				//							return;
				//						}
				//
				//						foreach ( $xmlData->relatedSkill as $relatedSkill ) {
				//							$relatedSkillText = (string) $relatedSkill;
				//
				//							$relatedSkillTextLower = strtolower( (string) $relatedSkill );
				//							if ( strpos( $relatedSkillTextLower, 'dimension' ) !== false ) {
				//								if ( ! empty( $item ) ) {
				//									$items[] = $item;
				//								}
				//								$item = [
				//									'dimension' => $relatedSkillText,
				//								];
				//							}
				//							if ( strpos( $relatedSkillTextLower, 'knowledge' ) !== false ) {
				//								$item['knowledge'] = $relatedSkillText;
				//							}
				//							if ( strpos( $relatedSkillTextLower, 'skill' ) !== false ) {
				//								$item['skill'] = $relatedSkillText;
				//							}
				//							if ( strpos( $relatedSkillTextLower, 'attitude' ) !== false ) {
				//								$item['attitude'] = $relatedSkillText;
				//							}
				//						}
				//						$items[] = $item;
				//
				//						carbon_set_post_meta( $post_id, 'learning_maturity_model_skills', $items );
				//					}
				//				]
			];

			$enable_lmm = carbon_get_theme_option('enable_lmm');
			if (! $enable_lmm) {
				return $general_fields;
			}
			$general_fields[] =

				[
					'type'          => 'association',
					'slug'          => 'dimension_subset_item',
					'xml_slug'      => $prefix . 'dimensionSubsetItem.id',
					'title'         => __('Dimension subset item'),
					'post_type'     => DimensionSubsetItem::POST_TYPE,
					'class'         => DimensionSubsetItem::class,
					'prefix'        => $prefix . 'dimensionSubsetItem',
					'custom_update' => function ($xmlData, $post_id) {
						$enable_lmm = carbon_get_theme_option('enable_lmm');
						if (! $enable_lmm) {
							return;
						}

						$current_subset_unique_id = null;
						$lookingFor = 'subset';
						$valuesToUpdate = [];
						foreach ($xmlData->relatedSkill as $relatedSkill) {
							$relatedSkillTextLower = strtolower((string)$relatedSkill);

							if (strpos((string)$relatedSkillTextLower, $lookingFor) !== false) {
								$textArraySubset = explode($lookingFor, $relatedSkillTextLower);
								$textArrayDimension = explode('dimension', $relatedSkillTextLower);
								$textArrayDimension = explode(':', $textArrayDimension[1]);
								$textArraySubset = explode(':', $textArraySubset[1]);
								$textDimension = trim($textArrayDimension[0]);
								$textSubset = trim($textArraySubset[0]);

								$args = [
									'post_type'  => DimensionSubset::POST_TYPE,
									'meta_key'   => '_unique_id',
									'meta_value' => $textDimension . '.' . $textSubset,
								];
								$query = get_posts($args);

								$object = $query[0] ?? null;
								if ($object) {
									$current_subset_unique_id = $textDimension . '.' . $textSubset;
								}
							} else {
								$type = null;
								if (strpos((string)$relatedSkillTextLower, 'knowledge') !== false) {
									$type = 'knowledge';
								}
								if (strpos((string)$relatedSkillTextLower, 'skills') !== false) {
									$type = 'skills';
								}
								if (strpos((string)$relatedSkillTextLower, 'attitudes') !== false) {
									$type = 'attitudes';
								}

								$level = null;
								if (strpos((string)$relatedSkillTextLower, 'explorer') !== false) {
									$level = 'explorer';
								}
								if (strpos((string)$relatedSkillTextLower, 'pioneer') !== false) {
									$level = 'pioneer';
								}
								if (strpos((string)$relatedSkillTextLower, 'expert') !== false) {
									$level = 'expert';
								}

								if (! $level || ! $type) {
									continue;
								}

								$args = [
									'post_type'  => DimensionSubsetItem::POST_TYPE,
									'meta_key'   => '_unique_id',
									'meta_value' => $current_subset_unique_id . '_' . $level . '_' . $type,
								];

								$query = get_posts($args);

								$object = $query[0] ?? null;
								if ($object) {
									$valuesToUpdate[] = 'post:' . DimensionSubset::POST_TYPE . ':' . $object->ID;
								}
							}
						}

						carbon_set_post_meta($post_id, 'dimension_subset_item', $valuesToUpdate);
					},
				];

			// [
			// 	'type'          => 'association',
			// 	'slug'          => 'dimension_subset',
			// 	'xml_slug'      => $prefix . 'relatedSkill',
			// 	'title'         => __( 'Dimension subset' ),
			// 	'post_type'     => DimensionSubset::POST_TYPE,
			// 	'class'         => DimensionSubset::class,
			// 	'multiple'      => false,
			// 	'prefix'        => $prefix . 'dimensionSubset',
			// 	'custom_update' => function ( $xmlData, $post_id ) {
			// 		$lookingFor = 'Subset';
			// 		foreach ( $xmlData->relatedSkill as $relatedSkill ) {
			// 			if ( strpos( (string) $relatedSkill, $lookingFor ) !== false ) {
			// 				$text               = (string) $relatedSkill;
			// 				$textArraySubset    = explode( $lookingFor, $text );
			// 				$textArrayDimension = explode( 'Dimension', $text );
			// 				$textArrayDimension = explode( ':', $textArrayDimension[1] );
			// 				$textArraySubset    = explode( ':', $textArraySubset[1] );
			// 				$textDimension      = trim( $textArrayDimension[0] );
			// 				$textSubset         = trim( $textArraySubset[0] );
			//
			// 				$args  = [
			// 					'post_type'  => DimensionSubset::POST_TYPE,
			// 					'meta_key'   => '_unique_id',
			// 					'meta_value' => $textDimension . '.' . $textSubset,
			// 				];
			// 				$query = get_posts( $args );
			//
			// 				$object = $query[0] ?? null;
			// 				if ( ! $object ) {
			// 					continue;
			// 				}
			//
			// 				carbon_set_post_meta( $post_id, 'dimension_subset', [ 'post:' . DimensionSubset::POST_TYPE . ':' . $object->ID ] );
			//
			// 			}
			//
			// 		}
			// 	},
			// ],

			return $general_fields;
		}
		//
		// public static function get_carbon_fields( $type ) {
		// 	$fields = [];
		// 	foreach ( self::$type() as $field ) {
		// 		if ( $field['post_type'] ?? false ) {
		// 			$fields[] = Field::make( $field["type"], $field["slug"], $field["title"] )->set_types( [
		// 				[
		// 					'type'      => 'post',
		// 					'post_type' => $field['post_type'],
		// 				]
		// 			] );
		// 		} elseif ( $field['type'] == 'complex' ) {
		// 			$fields[] = Field::make( $field["type"], $field["slug"], __( $field["title"] ) )
		// 			                 ->add_fields( $field["fields"] );
		// 		} elseif ( $field['type'] == 'date' ) {
		// 			$fields[] = Field::make( $field["type"], $field["slug"], $field["title"] )->set_input_format( 'd.m.Y', 'd.m.Y' );;
		// 		} else {
		// 			$fields[] = Field::make( $field["type"], $field["slug"], $field["title"] );
		// 		}
		// 	}
		//
		// 	return $fields;
		// }

	}
}
