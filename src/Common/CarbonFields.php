<?php

namespace LearningOpportunitiesCatalogue\Common;

use Carbon_Fields\Container;
use Carbon_Fields\Field;
use LearningOpportunitiesCatalogue\Common\PostTypes\Catalogue;
use LearningOpportunitiesCatalogue\Common\PostTypes\CatalogueFields;
use LearningOpportunitiesCatalogue\Common\PostTypes\LearningOutcomeFields;
use LearningOpportunitiesCatalogue\Common\PostTypes\LearningOutcome;
use LearningOpportunitiesCatalogue\Common\Settings\Main as Common_Settings;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( CarbonFields::class ) ) {

	class CarbonFields {

		/**
		 * Get the Settings instance from Common.
		 *
		 * @var Common_Settings
		 */
		private $settings;

		/**
		 * Initialize the class and set its properties.
		 */
		public function __construct() {
			$this->settings = new Common_Settings();
		}


		public function init() {
			\Carbon_Fields\Carbon_Fields::boot();
		}

		private function isWpmlInstalled() {

			return defined( 'ICL_LANGUAGE_CODE' );
		}

		public static function crb_get_i18n_suffix() {
			$suffix = '_en';
			if ( ! defined( 'ICL_LANGUAGE_CODE' ) ) {
				return $suffix;
			}
			$suffix = '_' . ICL_LANGUAGE_CODE;

			return $suffix;
		}

		public static function crb_get_i18n_theme_option( $option_name ) {
			$suffix = self::crb_get_i18n_suffix();

			return carbon_get_theme_option( $option_name . $suffix );
		}

		public function register_fields() {

			$languagesOptions = [];
			if ( $this->isWpmlInstalled() ) {
				$languages = apply_filters( 'wpml_active_languages', null, 'orderby=id&order=desc' );

				foreach ( $languages as $language ) {
					$languagesOptions[ $language['language_code'] ] = $language['translated_name'];
				}
			}

			Container::make( 'theme_options', __( 'Options' ) )
			         ->set_page_parent( $this->settings->get_settings_page_slug() )
			         ->add_fields( [
				         Field::make( 'text', 'meilisearch_url', __( 'Meilisearch URL' ) ),
				         Field::make( 'text', 'meilisearch_key', __( 'Meilisearch API key' ) ),
				         Field::make( 'checkbox', 'enable_lmm', __( 'Enable learning maturity models' ) )
				              ->set_option_value( 'yes' ),

				         Field::make( 'complex', 'languages' . self::crb_get_i18n_suffix(), __( 'Languages' ) )
				              ->set_layout( 'tabbed-horizontal' )
				              ->add_fields( [
					              Field::make( 'text', 'name', __( 'Language name' ) )->set_width( 33 ),
					              Field::make( 'text', 'xml_code', __( 'XML Language code' ) )->set_width( 33 ),
					              Field::make( 'select', 'wpml_code', __( 'WPML language' ) )->set_options( $languagesOptions )->set_width( 33 ),
				              ] ),
				         Field::make( 'complex', 'learning_opportunity_types' . self::crb_get_i18n_suffix(), __( 'Learning opportunity types' ) )
				              ->set_layout( 'tabbed-horizontal' )
				              ->add_fields( [
					              Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
					              Field::make( 'text', 'description', __( 'Description' ) )->set_width( 50 ),
				              ] ),

				         Field::make( 'complex', 'admission_procedure' . self::crb_get_i18n_suffix(), __( 'Admission procedures' ) )
				              ->set_layout( 'tabbed-horizontal' )
				              ->add_fields( [
					              Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
				              ] ),
				         Field::make( 'complex', 'provider_types' . self::crb_get_i18n_suffix(), __( 'Provider types' ) )
				              ->set_layout( 'tabbed-horizontal' )
				              ->add_fields( [
					              Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
				              ] ),
				         Field::make( 'complex', 'modes' . self::crb_get_i18n_suffix(), __( 'Modes' ) )
				              ->set_layout( 'tabbed-horizontal' )
				              ->add_fields( [
					              Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
				              ] ),
				         Field::make( 'complex', 'learning_settings' . self::crb_get_i18n_suffix(), __( 'Learning settings' ) )
				              ->set_layout( 'tabbed-horizontal' )
				              ->add_fields( [
					              Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
				              ] ),

			         ] );


			$fields = [
				[
					'title'  => __( 'Catalog item - General fields' ),
					'fields' => CatalogueFields::get_general_fields(),
					'class'  => Catalogue::class,
				],
				[
					'title'  => __( 'Catalog item - Learning specification fields' ),
					'fields' => CatalogueFields::get_learning_specification_fields(),
					'class'  => Catalogue::class,
				],
				[
					'title'  => __( 'Catalog item - Contact fields' ),
					'fields' => CatalogueFields::get_contact_fields(),
					'class'  => Catalogue::class,
				],
				[
					'title'  => __( 'Learning outcome - general fields' ),
					'fields' => LearningOutcomeFields::get_general_fields(),
					'class'  => LearningOutcome::class,
				],
			];


			$container = Container::make( 'theme_options', __( 'Fields settings' ) )
			                      ->set_page_parent( $this->settings->get_settings_page_slug() );

			foreach ( $fields as $fieldsForThemeOptions ) {
				$fields_for_theme_options = [];
				$post_type                = $fieldsForThemeOptions["class"]::POST_TYPE;
				foreach ( $fieldsForThemeOptions['fields'] as $field ) {
					$prefix                     = $field["slug"] . '_' . $post_type . '_';
					$title                      = $field["title"] . ' - ' . __( 'Filter' );
					$slug                       = $prefix . 'filter';
					$fields_for_theme_options[] = Field::make( 'select', $slug, $title )
					                                   ->set_options( [
						                                   'disable'  => __( 'Disable' ),
						                                   'checkbox' => __( 'Checkbox' ),
						                                   'slider'   => __( 'Slider' ),
						                                   'date'     => __( 'Date' ),
					                                   ] )->set_width( 33 );
					$title                      = __( 'Search weight' );
					$slug                       = $prefix . 'searchable';
					$fields_for_theme_options[] = Field::make( 'text', $slug, $title )
					                                   ->set_attribute( 'type', 'number' )
					                                   ->set_default_value( 1 )
					                                   ->set_width( 33 );
					$title                      = __( 'Visible in website (frontend) table' );
					$slug                       = $prefix . 'visible';
					$fields_for_theme_options[] = Field::make( 'checkbox', $slug, $title )
					                                   ->set_option_value( 'yes' )
					                                   ->set_width( 33 );
				}
				$container = $container->add_tab( $fieldsForThemeOptions['title'], $fields_for_theme_options );
			}
			$container->add_tab( __( 'Additional fields' ), [
				Field::make( 'complex', 'loc_option_catalogue_fields', __( 'Catalog item fields' ) )
				     ->set_visible_in_rest_api( true )
				     ->add_fields( [
					     Field::make( 'text', 'title', __( 'Field title' ) )->set_width( 25 ),
					     Field::make( 'text', 'slug', __( 'Field slug' ) )->set_width( 25 ),
					     Field::make( 'select', 'type', __( 'Field type' ) )
					          ->add_options( [
						          'text'     => __( 'Text' ),
						          'date'     => __( 'Date' ),
						          'textarea' => __( 'Textarea' ),
					          ] )->set_width( 10 ),
					     Field::make( 'text', 'searchable', __( 'Searchable' ) )
					          ->set_attribute( 'type', 'number' )->set_width( 10 ),
					     Field::make( 'select', 'filter', __( 'Filter' ) )
					          ->set_options( [
						          'disable'  => __( 'Disable' ),
						          'checkbox' => __( 'Checkbox' ),
						          'slider'   => __( 'Slider' ),
						          'date'     => __( 'Date' ),
					          ] )->set_width( 15 ),
					     Field::make( 'select', 'width', __( 'Width in editor' ) )
					          ->set_options( [
						          '100' => '100%',
						          '50'  => '50%',
						          '33'  => '33%',
						          '20'  => '20%',
					          ] )->set_width( 15 ),
				     ] )
			] );
		}

		public function theme_options_container_saved() {
			$facets = [];

			if ( ! Meilisearch::health() ) {
				return false;
			}

			$filter_fields     = CatalogueFields::get_filter_fields();
			$searchable_fields = CatalogueFields::get_searchable_fields();

			$searchables = [ 'post_title', 'post_content' ];

			foreach ( $searchable_fields as $field ) {
				$searchables[] = $field['slug'];
			}

			foreach ( $filter_fields as $field ) {
				if ( $field['filter_type'] == 'checkbox' ) {
					$facets[] = $field['slug'];
				}

				if ( in_array( $field['filter_type'], [ 'slider', 'date' ] ) ) {
					$searchables[] = $field['slug'];
				}
			}

			$searchIndex = Meilisearch::get_index( Catalogue::POST_TYPE );

			$searchIndex->updateAttributesForFaceting( $facets );
			$searchIndex->updateSearchableAttributes( $searchables );
		}
	}
}
