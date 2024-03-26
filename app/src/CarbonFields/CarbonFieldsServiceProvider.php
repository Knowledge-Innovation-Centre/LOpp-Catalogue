<?php

namespace LearningOpportunitiesCatalogue\CarbonFields;

use Carbon_Fields\Carbon_Fields;
use Carbon_Fields\Container;
use Carbon_Fields\Field;
use LearningOpportunitiesCatalogue\Meilisearch;
use LearningOpportunitiesCatalogue\PostTypes\Catalogue;
use LearningOpportunitiesCatalogue\PostTypes\CatalogueFields;
use LearningOpportunitiesCatalogue\PostTypes\LearningOutcome;
use LearningOpportunitiesCatalogue\PostTypes\LearningOutcomeFields;
use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Provides Carbon Fields integration.
 */
class CarbonFieldsServiceProvider implements ServiceProviderInterface {
	public static function crb_get_i18n_theme_option( $option_name ) {
		$suffix = self::crb_get_i18n_suffix();

		return carbon_get_theme_option( $option_name . $suffix );
	}

	public static function crb_get_i18n_suffix() {
		$suffix = '_en';
		if ( ! defined( 'ICL_LANGUAGE_CODE' ) ) {
			return $suffix;
		}
		$suffix = '_' . ICL_LANGUAGE_CODE;

		return $suffix;
	}

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
		// Nothing to register.
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_action( 'after_setup_theme', [ $this, 'bootstrapCarbonFields' ], 100 );
		add_filter( 'carbon_fields_map_field_api_key', [ $this, 'filterCarbonFieldsGoogleMapsKey' ] );
		add_action( 'carbon_fields_register_fields', [ $this, 'registerFields' ] );
		add_action( 'carbon_fields_theme_options_container_saved', [ $this, 'theme_options_container_saved' ] );
		add_action( 'widgets_init', [ $this, 'registerWidgets' ] );
	}

	/**
	 * Bootstrap Carbon Fields.
	 *
	 * @return void
	 */
	public function bootstrapCarbonFields() {
		Carbon_Fields::boot();
	}

	/**
	 * Filter the Google Maps API key Carbon Fields use.
	 *
	 * @return string
	 */
	public function filterCarbonFieldsGoogleMapsKey() {
		return carbon_get_theme_option( 'crb_google_maps_api_key' );
	}

	/**
	 * Register Carbon Fields fields.
	 *
	 * @return void
	 */
	public function registerFields() {
		$this->registerThemeOptions();
		$this->registerPostMeta();
		$this->registerTermMeta();
		$this->registerUserMeta();
	}

	/**
	 * Register Theme Options fields.
	 *
	 * @return void
	 */
	protected function registerThemeOptions() {
		$languagesOptions = [];
		if ( $this->isWpmlInstalled() ) {
			$languages = apply_filters( 'wpml_active_languages', null, 'orderby=id&order=desc' );

			foreach ( $languages as $language ) {
				$languagesOptions[ $language['language_code'] ] = $language['translated_name'];
			}
		}
		$parentContainer = Container::make( 'theme_options', __( 'LOC Options', 'learning_opportunities_catalogue' ) )
		                            ->set_page_parent( 'edit.php?post_type=loc_catalogue_item' )
		                            ->set_page_file( 'learning_opportunities_catalogue-theme-options' )
		                            ->set_page_menu_position( 80 )
		                            ->add_fields( [
			                            Field::make( 'text', 'meilisearch_url', __( 'Meilisearch URL' ) ),
			                            Field::make( 'text', 'meilisearch_key', __( 'Meilisearch Master key' ) ),
			                            Field::make( 'text', 'meilisearch_index_key', __( 'Meilisearch index key' ) )->set_default_value( Catalogue::POST_TYPE ),
			                            Field::make( 'association', 'catalogue_search_page', __( 'Catalogue items search page' ) )->set_types( array(
				                            array(
					                            'type'      => 'post',
					                            'post_type' => 'page',
				                            )
			                            ) )->set_max( 1 ),
			                            Field::make( 'text', 'catalogue_search_page_result_text', __( 'Catalogue search page result text' ) ),
			                            Field::make( 'checkbox', 'enable_lmm', __( 'Enable learning maturity models' ) )
			                                 ->set_option_value( 'yes' ),
			                            Field::make( 'checkbox', 'hide_rows_no_data', __( 'Hide rows with no data' ) )
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
			                            Field::make( 'complex', 'iscedf_code' . self::crb_get_i18n_suffix(), __( 'ISCEDF Code' ) )
			                                 ->set_layout( 'tabbed-horizontal' )
			                                 ->add_fields( [
				                                 Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
			                                 ] ),
			                            Field::make( 'complex', 'eqf_level' . self::crb_get_i18n_suffix(), __( 'EQF level' ) )
			                                 ->set_layout( 'tabbed-horizontal' )
			                                 ->add_fields( [
				                                 Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
			                                 ] ),
			                            Field::make( 'complex', 'type_of_credential' . self::crb_get_i18n_suffix(), __( 'Type of credential' ) )
			                                 ->set_layout( 'tabbed-horizontal' )
			                                 ->add_fields( [
				                                 Field::make( 'text', 'name', __( 'Name' ) )->set_width( 50 ),
			                                 ] ),
			                            Field::make( 'complex', 'assessment_type' . self::crb_get_i18n_suffix(), __( 'Assessment type' ) )
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
				'title'  => __( 'Catalog item - Information about the LOpp fields' ),
				'fields' => CatalogueFields::get_information_about_the_lopp_fields(),
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

		$container = Container::make( 'theme_options', __( 'LOC Fields settings' ) )
		                      ->set_page_parent( 'edit.php?post_type=loc_catalogue_item' )
		                      ->set_page_menu_position( 80 )
		                      ->set_page_file( 'learning_opportunities_catalogue-theme-options2.php' );

		foreach ( $fields as $fieldsForThemeOptions ) {
			$fields_for_theme_options = [];
			$post_type                = $fieldsForThemeOptions["class"]::POST_TYPE;
			foreach ( $fieldsForThemeOptions['fields'] as $field ) {
				$prefix                     = $field["slug"] . '_' . $post_type . '_';
				$title                      = $field["title"] . ' - ' . __( 'Filter' );
				$slug                       = $prefix . 'filter';
				$fields_for_theme_options[] = Field::make( 'select', $slug, $title )
				                                   ->set_options( [
					                                   'disable'     => __( 'Disable' ),
					                                   'checkbox'    => __( 'Checkbox' ),
					                                   'dropdown'    => __( 'Dropdown' ),
					                                   'multiselect' => __( 'Multiselect' ),
					                                   'slider'      => __( 'Slider' ),
					                                   'date'        => __( 'Date' ),
				                                   ] )->set_width( 30 );
				$title                      = __( 'Search weight' );
				$slug                       = $prefix . 'searchable';
				$fields_for_theme_options[] = Field::make( 'text', $slug, $title )
				                                   ->set_attribute( 'type', 'number' )
				                                   ->set_default_value( 1 )
				                                   ->set_width( 30 );
				$title                      = __( 'Visible in website (frontend) table' );
				$slug                       = $prefix . 'visible';
				$fields_for_theme_options[] = Field::make( 'checkbox', $slug, $title )
				                                   ->set_option_value( 'yes' )
				                                   ->set_width( 10 );
				$title                      = __( 'Visible in catalogue list (frontend)' );
				$slug                       = $prefix . 'visible_in_list';
				$fields_for_theme_options[] = Field::make( 'checkbox', $slug, $title )
				                                   ->set_option_value( 'yes' )
				                                   ->set_width( 10 );
				$title                      = __( 'Required field' );
				$slug                       = $prefix . 'required';
				$fields_for_theme_options[] = Field::make( 'checkbox', $slug, $title )
				                                   ->set_option_value( 'yes' )
				                                   ->set_width( 10 );
				$title                      = __( 'Is url' );
				$slug                       = $prefix . 'is_url';
				$fields_for_theme_options[] = Field::make( 'checkbox', $slug, $title )
				                                   ->set_option_value( 'yes' )
				                                   ->set_width( 10 );
			}
			$container = $container->add_tab( $fieldsForThemeOptions['title'], $fields_for_theme_options );
		}

		$container->add_tab( __( 'Additional fields' ), [
			Field::make( 'complex', 'loc_option_catalogue_fields', __( 'Catalog item fields' ) )
			     ->set_visible_in_rest_api( true )
			     ->add_fields( [
				     Field::make( 'text', 'title', __( 'Field title' ) )->set_width( 15 )->set_required(),
				     Field::make( 'text', 'slug', __( 'Field slug' ) )->set_width( 15 )->set_required(),
				     Field::make( 'select', 'type', __( 'Field type' ) )
				          ->add_options( [
					          'text'     => __( 'Text' ),
					          'date'     => __( 'Date' ),
					          'textarea' => __( 'Textarea' ),
				          ] )->set_width( 10 ),
				     Field::make( 'text', 'searchable', __( 'Search weight' ) )
				          ->set_attribute( 'type', 'number' )->set_width( 10 ),
				     Field::make( 'select', 'filter', __( 'Filter' ) )
				          ->set_options( [
					          'disable'     => __( 'Disable' ),
					          'checkbox'    => __( 'Checkbox' ),
					          'dropdown'    => __( 'Dropdown' ),
					          'multiselect' => __( 'Multiselect' ),
					          'slider'      => __( 'Slider' ),
					          'date'        => __( 'Date' ),
				          ] )->set_width( 10 ),
				     Field::make( 'select', 'width', __( 'Width in editor' ) )
				          ->set_options( [
					          '100' => '100%',
					          '50'  => '50%',
					          '33'  => '33%',
					          '20'  => '20%',
				          ] )->set_width( 5 ),
				     Field::make( 'checkbox', 'visible', __( 'Visible in website (frontend) table' ) )
				          ->set_option_value( 'yes' )
				          ->set_width( 5 ),
				     Field::make( 'checkbox', 'visible_in_list', __( 'Visible in catalogue list (frontend)' ) )
				          ->set_option_value( 'yes' )
				          ->set_width( 5 ),
				     Field::make( 'checkbox', 'required', 'Required field' )
				          ->set_option_value( 'yes' )
				          ->set_width( 5 ),
				     Field::make( 'checkbox', 'is_url', 'Is url' )
				          ->set_option_value( 'yes' )
				          ->set_width( 5 ),

			     ] )
		] );
	}

	private function isWpmlInstalled() {
		return defined( 'ICL_LANGUAGE_CODE' );
	}

	/**
	 * Register Post Meta fields.
	 *
	 * @return void
	 */
	protected function registerPostMeta() {
		/*
		Container::make( 'post_meta', __( 'Custom Data', 'learning_opportunities_catalogue' ) )
			->where( 'post_type', '=', 'page' )
			->add_fields( array(
				Field::make( 'complex', 'crb_my_data' )
					->add_fields( array(
						Field::make( 'text', 'title' )
							->help_text( 'lorem' ),
					) ),
				Field::make( 'map', 'crb_location' )
					->set_position( 37.423156, -122.084917, 14 ),
				Field::make( 'image', 'crb_img' ),
				Field::make( 'file', 'crb_pdf' ),
			));
		*/
	}

	/**
	 * Register Term Meta fields.
	 *
	 * @return void
	 */
	protected function registerTermMeta() {
		/*
		Container::make( 'term_meta', __( 'Custom Data', 'learning_opportunities_catalogue' ) )
			->where( 'term_taxonomy', '=', 'category' )
			->add_fields( array(
				Field::make( 'image', 'crb_img' ),
			));
		*/
	}

	/**
	 * Register User Meta fields.
	 *
	 * @return void
	 */
	protected function registerUserMeta() {
		/*
		Container::make( 'user_meta', __( 'Custom Data', 'learning_opportunities_catalogue' ) )
			->add_fields( array(
				Field::make( 'image', 'crb_img' ),
			));
		*/
	}

	/**
	 * Register Widgets.
	 *
	 * @return void
	 */
	public function registerWidgets() {
//		register_widget( \LearningOpportunitiesCatalogue\Widgets\Carbon_Rich_Text_Widget::class );
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
			if ( in_array( $field['filter_type'], [ 'checkbox', 'dropdown', 'multiselect', 'slider', 'date' ] ) ) {
				$facets[] = $field['slug'];
			}
		}

		$facets[] = 'loc_subset_items';

		Meilisearch::update_api_key();

		$searchIndex = Meilisearch::get_index();

		$searchIndex->updateFilterableAttributes( $facets );
		$searchIndex->updateSearchableAttributes( $searchables );
	}
}
