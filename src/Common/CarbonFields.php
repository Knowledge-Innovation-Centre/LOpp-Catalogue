<?php

namespace LearningOpportunitiesCatalogue\Common;

use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( CarbonFields::class ) ) {

	class CarbonFields {
		public function init() {
			\Carbon_Fields\Carbon_Fields::boot();
		}

		public function plugin_options() {
			Container::make( 'theme_options', __( 'LOC Options' ) )
			         ->add_tab( __( 'General' ), [
				         Field::make( 'text', 'meilisearch_url', __( 'Meilisearch URL' ) ),
				         Field::make( 'text', 'meilisearch_key', __( 'Meilisearch API key' ) ),
			         ] )
			         ->add_tab( __( 'Fields' ), [

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

	}
}
