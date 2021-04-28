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

if ( ! class_exists( Catalogue::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class Catalogue {
		public $post_type = 'loc_catalogue_item';
		const POST_TYPE = 'loc_catalogue_item';

		public function register() {
			register_extended_post_type( $this->post_type, [
				'admin_cols'  => $this->get_admin_cols(),
				'has_archive' => true,
				'supports'    => [ 'title', 'thumbnail', 'editor', 'excerpt' ],
				// 'capabilities' => [
				// 	'edit_post'          => 'edit_catalogue_item',
				// 	'read_post'          => 'read_catalogue_item',
				// 	'delete_post'        => 'delete_catalogue_item',
				// 	'edit_posts'         => 'edit_catalogue_items',
				// 	'edit_others_posts'  => 'edit_others_catalogue_items',
				// 	'publish_posts'      => 'publish_catalogue_items',
				// 	'read_private_posts' => 'read_private_catalogue_items',
				// ]
			], [

				# Override the base names used for labels:
				'singular' => 'Catalogue_item',
				'plural'   => 'Catalogue items',
				'slug'     => 'Catalogue_items',

			] );

		}

		public function get_admin_cols() {
			return [
				'learning_opportunity_type' => [
					'title'    => 'Learning opportunity type',
					'meta_key' => 'learning_opportunity_type',
				],
				'unique_id'                 => [
					'title'    => 'Unique ID',
					'meta_key' => 'unique_id',
				],
				'home_page'                 => [
					'title'    => 'Home page',
					'function' => function () {
						global $post;
						$url = get_post_meta( $post->ID, 'url', 1 );
						echo '<a href="' . $url . '" target="_blank">' . $url . '</a>';
					},
				],
			];
		}

		public function custom_fields() {
			$this->common_custom_fields();

			// $catalog_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );
			//
			// $fields = [];
			// foreach ( $catalog_fields as $catalog_field ) {
			// 	try {
			// 		$fields[] = Field::make( $catalog_field['type'], $catalog_field['slug'], __( $catalog_field['title'] ) )->set_width( $catalog_field['width'] );
			// 	} catch ( Exception $e ) {
			// 		var_dump( $e );
			// 	}
			//
			// }
			//
			// Container::make( 'post_meta', 'Catalogue item additional data' )
			//          ->where( 'post_type', '=', $this->post_type )
			//          ->set_priority( 'low' )
			//          ->add_fields( $fields );
		}


		private function common_custom_fields() {

			Container::make( 'post_meta', 'Catalogue item data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->set_priority( 'low' )
			         ->add_tab( __( 'General' ), CatalogueFields::get_carbon_fields( 'get_general_fields' ) )
			         ->add_tab( __( 'Learning specification' ), CatalogueFields::get_carbon_fields( 'get_learning_specification_fields' ) )
			         ->add_tab( __( 'Contact' ), CatalogueFields::get_carbon_fields( 'get_contact_fields' ) );
		}

		function add_content_after( $content ) {
			global $post;

			if ( is_single() && $post->post_type == $this->post_type ) {

				$allMeta = get_post_meta( $post->ID, '', true );

				$allMeta = array_map( function ( $n ) {
					return $n[0];
				}, $allMeta );

				// $catalog_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );

				$content .= '<p>
				Type: ' . $allMeta['_learning_opportunity_type'] . '<br />
				Home page: <a href = "' . $allMeta['_home_page'] . '" > ' . $allMeta['_home_page'] . ' </a ><br />

				<table >
					<tbody >';

				$content .= '<tr>' .
				            '<th colspan="2">' . __( 'General data' ) . '</th>' .
				            '</tr>';


				foreach ( CatalogueFields::get_general_fields() as $field ) :
					$content .= '<tr>' .
					            '<td>' . $field['title'] . '</td>' .
					            '<td>' . ( $allMeta[ '_' . $field['slug'] ] ?? '' ) . '</td>'
					            . '</tr>';
				endforeach;

				$content .= '<tr>' .
				            '<th colspan="2">' . __( 'Learning specification' ) . '</th>' .
				            '</tr>';


				foreach ( CatalogueFields::get_learning_specification_fields() as $field ) :
					$content .= '<tr>' .
					            '<td>' . $field['title'] . '</td>' .
					            '<td>' . ( $allMeta[ '_' . $field['slug'] ] ?? '' ) . '</td>'
					            . '</tr>';
				endforeach;

				$content .= '<tr>' .
				            '<th colspan="2">' . __( 'Contact' ) . '</th>' .
				            '</tr>';


				foreach ( CatalogueFields::get_contact_fields() as $field ) :
					$content .= '<tr>' .
					            '<td>' . $field['title'] . '</td>' .
					            '<td>' . ( $allMeta[ '_' . $field['slug'] ] ?? '' ) . '</td>'
					            . '</tr>';
				endforeach;

				// $content .= '<tr>' .
				//             '<th colspan="2">' . __( 'Additional data' ) . '</th>' .
				//             '</tr>';
				// foreach ( $catalog_fields as $field ) :
				// 	$content .= '<tr>' .
				// 	            '<td>' . $field['title'] . '</td>' .
				// 	            '<td>' . ( $allMeta[ '_' . $field['slug'] ] ?? '' ) . '</td>'
				// 	            . '</tr>';
				// endforeach;

				$content .=
					'
					</tbody >
				</table >';

			}


			return $content;

		}

		public function save_post( $meta_id, $post_id, $meta_key = '', $meta_value = '' ) {
			if ( $meta_key != '_edit_lock' ) {
				return;
			}

			if ( wp_is_post_revision( $post_id ) ) {
				return;
			}

			$post = get_post( $post_id );

			if ( $post->post_type != $this->post_type ) {
				return;
			}

			if ( $post->post_status == 'trash' ) {
				CatalogueSearchIndex::delete_index( $post_id );
			} else {
				CatalogueSearchIndex::update_index( $post_id );
			}

		}

		public function delete_post( $post_ID ) {

			CatalogueSearchIndex::delete_index( $post_ID );
		}

	}
}
