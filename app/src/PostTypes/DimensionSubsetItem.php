<?php

namespace LearningOpportunitiesCatalogue\PostTypes;


// Abort if this file is called directly.
use Carbon_Fields\Container;
use Carbon_Fields\Field;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( DimensionSubsetItem::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class DimensionSubsetItem {
		public $post_type = 'loc_subset_item';
		const POST_TYPE = 'loc_subset_item';

		public function register() {
			$enable_lmm = carbon_get_theme_option( 'enable_lmm' );
			if ( ! $enable_lmm ) {
				return;
			}
			register_extended_post_type( $this->post_type, [
				'menu_position'=> 54,], [
				'singular' => 'LMM dimension subset item',
				'plural'   => 'LMM dimension subset items',
				'show_in_menu' => 'edit.php?post_type=' . self::POST_TYPE
			] );

		}

		public function custom_fields() {
			$enable_lmm = carbon_get_theme_option( 'enable_lmm' );
			if ( ! $enable_lmm ) {
				return;
			}
			Container::make( 'post_meta', 'Additional data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->set_priority( 'low' )
			         ->add_fields( [
				         Field::make( 'text', 'unique_id', __( "Unique ID" ) ),
				         Field::make( 'association', 'dimension_subset', __( 'Dimension subset' ) )
				              ->set_types( array(
					              array(
						              'type'      => 'post',
						              'post_type' => DimensionSubset::POST_TYPE,
					              )
				              ) ),
				         Field::make( 'select', 'level', __( 'Level' ) )
				              ->set_options( array(
					              'explorer' => __( 'Explorer' ),
					              'expert'   => __( 'Expert' ),
					              'pioneer'  => __( 'Pioneer' ),
				              ) ),
				         Field::make( 'select', 'type', __( 'Type' ) )
				              ->set_options( array(
					              'knowledge' => __( 'Knowledge' ),
					              'skill'     => __( 'Skill' ),
					              'attitude'  => __( 'Attitude' ),
				              ) ),
			         ] );
		}

	}
}
