<?php

namespace LearningOpportunitiesCatalogue\Common\PostTypes;

use Carbon_Fields\Container;
use Carbon_Fields\Field;
use Exception;
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

		public function register() {
			register_extended_post_type( $this->post_type, [
				'admin_cols'  => $this->get_admin_cols(),
				'has_archive' => true,
			], [

				# Override the base names used for labels:
				'singular' => 'Catalogue_item',
				'plural'   => 'Catalogue items',
				'slug'     => 'Catalogue_items',

			] );

		}

		public function get_admin_cols() {
			return [
				'type'      => [
					'title'    => 'Type',
					'meta_key' => 'type',
				],
				'unique_id' => [
					'title'    => 'Unique ID',
					'meta_key' => 'unique_id',
				],
				'url'       => [
					'title'    => 'URL',
					'function' => function () {
						global $post;
						$url = get_post_meta( $post->ID, 'url', 1 );
						echo '<a href="' . $url . '" target="_blank">' . $url . '</a>';
					},
				],
				'fees'      => [
					'title'    => 'Fees',
					'meta_key' => 'fees',
				]
			];

		}

		public function custom_fields() {
			$this->common_custom_fields();

			$catalog_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );

			$fields = [];
			foreach ( $catalog_fields as $catalog_field ) {
				try {
					$fields[] = Field::make( $catalog_field['type'], $catalog_field['slug'], __( $catalog_field['title'] ) )->set_width( $catalog_field['width'] );
				} catch ( Exception $e ) {
					var_dump( $e );
				}

			}

			Container::make( 'post_meta', 'Catalogue item additional data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->add_fields( $fields );
		}

		private function common_custom_fields() {

			Container::make( 'post_meta', 'Catalogue item common data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->add_fields( [
				         Field::make( "text", "unique_id", __( "Unique ID" ) )->set_width( 33 ),
				         Field::make( "text", "type", __( "Type" ) )->set_width( 33 ),
				         Field::make( "text", "url", __( "Url" ) )->set_width( 33 ),
			         ] );
		}

		function add_content_after( $content ) {
			global $post;

			if ( is_single() && $post->post_type == $this->post_type ) {

				$allMeta = get_post_meta( $post->ID, '', true );

				$allMeta = array_map( function ( $n ) {
					return $n[0];
				}, $allMeta );

				$catalog_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );

				$content .= '<p>
				Type: ' . $allMeta['_type'] . '<br />
				Url: <a href = "' . $allMeta['_url'] . '" > ' . $allMeta['_url'] . ' </a ><br />

				<table >
					<tbody >';


				foreach ( $catalog_fields as $catalog_field ) :
					$content .= '<tr>' .
					            '<td>' . $catalog_field['title'] . '</td>' .
					            '<td>' . $allMeta[ '_' . $catalog_field['slug'] ] . '</td>'
					            . '</tr>';
				endforeach;

				$content .=
					'
					</tbody >
				</table >';

			}


			return $content;

		}

		public function post_updated( $post_ID, $post_after ) {


			if ( $post_after->post_type != $this->post_type ) {
				return;
			}

			if ( $post_after->post_status == 'trash' ) {

				$this->delete_index( $post_ID );
			} else {

				$this->update_index( $post_ID );
			}

		}

		public function delete_post( $post_ID ) {
			if ( $post_after->post_type != $this->post_type ) {
				return;
			}

			$this->delete_index( $post_ID );
		}

		private function delete_index( $post_ID ) {

			$client = new Client( 'http://127.0.0.1:7700', 'masterKey' );
			$client->index( $this->post_type )->deleteDocument( $post_ID );
		}

		private function update_index( $post_ID ) {

			$post        = get_post( $post_ID );
			$client      = new Client( 'http://127.0.0.1:7700', 'masterKey' );
			$searchIndex = $client->index( $this->post_type );

			$catalogItemIndex                 = [];
			$catalogItemIndex['id']           = $post->ID;
			$catalogItemIndex['post_title']   = $post->post_title;
			$catalogItemIndex['post_content'] = $post->post_content;
			$catalogItemIndex['guid']         = $post->guid;


			$allMeta = get_post_meta( $post->ID, '', true );
			$allMeta = array_map( function ( $n ) {
				return $n[0];
			}, $allMeta );

			$catalogItemIndex['type'] = $allMeta['_type'];
			$catalogItemIndex['url']  = $allMeta['_url'];

			$catalog_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );

			foreach ( $catalog_fields as $catalog_field ) {
				$value = $allMeta[ '_' . $catalog_field['slug'] ];
				if ( ! $value ) {
					continue;
				}
				if ( $catalog_field['type'] == 'date' ) {

					$catalogItemIndex[ $catalog_field['slug'] ] = strtotime( $value );
					continue;
				}
				$catalogItemIndex[ $catalog_field['slug'] ] = $value;
			}

			$searchIndex->addDocuments( [ $catalogItemIndex ] );
			$searchIndex->updateAttributesForFaceting( [ 'type', 'language', 'fees', 'duration' ] );
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

			sleep( 2 );
			$index = 0;


			$catalogItemsIndex = [];
			foreach ( $xml->catalogue_item as $item ) {

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
					'meta_key'   => 'loc_unique_id',
					'meta_value' => (string) $item->Id,
				];
				$query = get_posts( $args );

				$data = array(
					'post_title'   => wp_strip_all_tags( (string) $item->title ),
					'post_content' => (string) $item->description,
					'post_type'    => 'loc_catalogue_item',
					'post_status'  => 'publish',
				);

				if ( $query[0] ?? false ) {
					$data['ID'] = $query[0]->ID;
				}

				$post_id = wp_insert_post( $data );

				update_post_meta( $post_id, '_loc_unique_id', (string) $item->id );
				update_post_meta( $post_id, '_url', (string) $item->url );
				update_post_meta( $post_id, '_type', (string) $item->type );


				$catalog_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );

				foreach ( $catalog_fields as $catalog_field ) {
					$catalogItemIndex[ $catalog_field['slug'] ] = $allMeta[ '_' . $catalog_field['slug'] ];
					update_post_meta( $post_id, '_' . $catalog_field['slug'], (string) $item->{$catalog_field['slug']} );
				}

				$this->update_index( $post_id );
			}


			$response = [];

			$response['index']    = $index;
			$response['count']    = $xml->count();
			$response['status']   = 'in_progress';
			$response['progress'] = $index / $xml->count() * 100;


			if ( $index >= $xml->count() ) {
				$response['status']   = 'finished';
				$response['progress'] = 100;

				update_option( 'loc_current_import_file_id', null );
				update_option( 'loc_import_offset', 0 );
			}

			wp_send_json( $response );
		}
	}
}
