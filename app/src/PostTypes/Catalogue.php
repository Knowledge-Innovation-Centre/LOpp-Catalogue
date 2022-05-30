<?php

namespace LearningOpportunitiesCatalogue\PostTypes;

use Carbon_Fields\Container;

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
		private $is_url_fields = [];
		private $is_url_options = [];
		private $hide_rows = false;

		public function register() {
			register_extended_post_type( $this->post_type, [
				'admin_cols'  => $this->get_admin_cols(),
				'has_archive' => true,
				'menu_position'=> 50,
				'supports'    => [ 'title', 'thumbnail', 'editor', 'excerpt' ],
				'show_in_menu' => 'edit.php?post_type=' . self::POST_TYPE
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
				'singular' => 'Catalogue item',
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
		}


		private function common_custom_fields() {

			Container::make( 'post_meta', 'Catalogue item data' )
			         ->where( 'post_type', '=', $this->post_type )
			         ->set_priority( 'low' )
			         ->add_tab( __( 'General' ), CatalogueFields::get_carbon_fields( 'get_general_fields', $this->post_type ) )
			         ->add_tab( __( 'Information about the LOpp' ), CatalogueFields::get_carbon_fields( 'get_information_about_the_lopp_fields',$this->post_type ) )
			         ->add_tab( __( 'Learning specification' ), CatalogueFields::get_carbon_fields( 'get_learning_specification_fields', $this->post_type ) )
			         ->add_tab( __( 'Contact' ), CatalogueFields::get_carbon_fields( 'get_contact_fields', $this->post_type ) )
			         ->add_tab( __( 'Related learning specifications' ), CatalogueFields::get_carbon_fields( 'get_part', $this->post_type ) );
		}

		function filterVisible($fields, $postType) {
			global $wpdb;
			$newFields = [];

			$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_visible'";
			$options = $wpdb->get_results( $query, OBJECT_K );

			foreach ($fields as $field) {
				$slugFilter = '_' . $field['slug'] . '_' . $postType . '_visible';
				if ( ! isset( $options[ $slugFilter ] ) || $options[ $slugFilter ]->option_value !== 'yes' ) {
					continue;
				}
				$newFields[] = $field;
			}

			return $newFields;
		}

		function add_content_after( $content ) {
			global $post;
			global $wpdb;
			if ( is_single() && $post->post_type == $this->post_type ) {

				$this->hide_rows = carbon_get_theme_option( 'hide_rows_no_data' );
				$content .= '<p>'  . $post->post_excerpt . '</p>';
			$this->is_url_fields = [];


				$fields =  $this->filterVisible(CatalogueFields::get_general_fields(), Catalogue::POST_TYPE);
				$informationAboutTheLoopFields =  $this->filterVisible(CatalogueFields::get_information_about_the_lopp_fields(), Catalogue::POST_TYPE);
				$learningSpecificationFields =  $this->filterVisible(CatalogueFields::get_learning_specification_fields(), Catalogue::POST_TYPE);
				$contactFields =  $this->filterVisible(CatalogueFields::get_contact_fields(), Catalogue::POST_TYPE);


				$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_is_url'";
				$this->is_url_options = $wpdb->get_results( $query, OBJECT_K );

				foreach (array_merge($fields, $informationAboutTheLoopFields, $learningSpecificationFields, $contactFields) as $field) {
					$slugFilter = '_' . $field['slug'] . '_' . Catalogue::POST_TYPE . '_is_url';
					if ( ! isset( $this->is_url_options[ $slugFilter ] ) || $this->is_url_options[ $slugFilter ]->option_value !== 'yes' ) {
						continue;
					}
					$this->is_url_fields[] = $field['slug'];
				}


				$content .= '
				<div id="tabs">
				  <ul class="tw-flex tw-flex-col sm:tw-flex-row">
					<li class="tw-border tw-border-solid tw-border-gray-800"><a href="#tabs-1">' . __( 'General data' ) . '</a></li>';

						if (count($informationAboutTheLoopFields)):
						$content .= '<li class="tw-border tw-border-solid tw-border-gray-800"><a href="#tabs-2">' . __( 'Information about the LOpp specification' ) . '</a></li>';
						endif;
						if (count($learningSpecificationFields)):
						$content .= '<li class="tw-border tw-border-solid tw-border-gray-800"><a href="#tabs-3">' . __( 'Learning specification' ) . '</a></li>';
						endif;
						if (count($contactFields)):
						$content .= '<li class="tw-border tw-border-solid tw-border-gray-800"><a href="#tabs-4">' . __( 'Contact' ) . '</a></li>';
						endif;
						$content .= '</ul>
				  <div id="tabs-1">
					<table>
						<tbody>';
							foreach ( $fields as $field ) :
								$content .= $this->getTableRowCarbon(get_the_ID(), $field['slug'], $field['title']);
							endforeach;
							$content .= '
						</tbody >
					</table >
				  </div>
				  <div id="tabs-2">
					<table>
						<tbody>';
							foreach ( $informationAboutTheLoopFields as $field ) :
								$content .= $this->getTableRowCarbon(get_the_ID(), $field['slug'], $field['title']);
							endforeach;
							$content .= '
						</tbody >
					</table >
				  </div>
				  <div id="tabs-3">
					<table>
						<tbody>';
							foreach ( $learningSpecificationFields as $field ) :
								$content .= $this->getTableRowCarbon(get_the_ID(), $field['slug'], $field['title']);
							endforeach;
							$content .= '
						</tbody >
					</table >
				  </div>
				  <div id="tabs-4">
					<table>
						<tbody>';
							foreach ( $contactFields as $field ) :
								$content .= $this->getTableRowCarbon(get_the_ID(), $field['slug'], $field['title']);
							endforeach;
							$content .= '
						</tbody >
					</table >
				  </div>
				</div>';

				$catalogue_search_page = carbon_get_theme_option( 'catalogue_search_page' );

				if (count($catalogue_search_page)) {
					$content .= __('<p><a href="' . get_permalink($catalogue_search_page[0]['id']) . '">Back to search</a></p>');
				}
			}


			return $content;

		}

		private function getTableRow($title, $value): string
		{

			if ( $this->hide_rows && !$value ) {
				return '';
			}
			return '<tr>' .
				'<td>' . $title . '</td>' .
				'<td>' . ($value ?: __('No data available')) . '</td>'
				. '</tr>';

		}
		private function getTableRowCarbon($id, $slug, $title) {
			$value = carbon_get_post_meta($id, $slug);

			if (is_string($value)) {

				if (in_array($slug, $this->is_url_fields)) {

					$value = '<a target="_blank" href="'. $value . '">'. $value .'</a>';
				}

				return $this->getTableRow($title, $value);
			}

			$content = '';

			if (!is_array($value)) { return $content; }
				foreach ( $value as $valueItem ) {
					if (isset($valueItem['dimension'])) {
						$content .= $this->getTableRow(__('Dimension'), $valueItem['dimension']);
					}
					if (isset($valueItem['knowledge'])) {
						$content .= $this->getTableRow(__('Knowledge'), $valueItem['knowledge']);
					}
					if (isset($valueItem['skill'])) {
						$content .= $this->getTableRow(__('Skill'), $valueItem['skill']);
					}
					if (isset($valueItem['attitude'])) {
						$content .= $this->getTableRow(__('Attitude'), $valueItem['attitude']);
					}
					if (isset($valueItem['subtype']) && $valueItem['subtype'] == LearningOutcome::POST_TYPE) {
						$fields = $this->filterVisible(LearningOutcomeFields::get_general_fields(), LearningOutcome::POST_TYPE);

						foreach ($fields as $field) {
							$slugFilter = '_' . $field['slug'] . '_' . LearningOutcome::POST_TYPE . '_is_url';
							if ( ! isset( $this->is_url_options[ $slugFilter ] ) || $this->is_url_options[ $slugFilter ]->option_value !== 'yes' ) {
								continue;
							}
							$this->is_url_fields[] = $field['slug'];
						}

						foreach ( $fields as $field ) :
							$content .= $this->getTableRowCarbon($valueItem['id'], $field['slug'], $field['title']);
						endforeach;
					}

					if (isset($valueItem['subtype']) && $valueItem['subtype'] == DimensionSubsetItem::POST_TYPE) {
						$content  .= $this->getTableRowCarbon($valueItem['id'], 'dimension_subset', __('Dimension subset'));
						$content  .= $this->getTableRow( __('Learning outcome (Learning Maturity Model)'), get_the_title($valueItem['id']) .  '<br>' . get_the_content(null, false,$valueItem['id']) );
					}
					if (isset($valueItem['subtype']) && $valueItem['subtype'] == DimensionSubset::POST_TYPE) {
						$content  .= $this->getTableRowCarbon($valueItem['id'], 'dimension', __('Dimension subset'));
						$content  .= $this->getTableRow( __('Dimension subset'), get_the_title($valueItem['id']));
						$content  .= $this->getTableRow( __('Dimension subset description'), get_the_content(null, false,$valueItem['id']));

					}
					if (isset($valueItem['subtype']) && $valueItem['subtype'] == Dimension::POST_TYPE) {
						$content  .= $this->getTableRow( __('Dimension'), get_the_title($valueItem['id']));
						$content  .= $this->getTableRow( __('Dimension description'), get_the_content(null, false,$valueItem['id']));
					}
				}

			return $content;
		}

		public function updated_post_meta( $meta_id, $post_id, $meta_key = '', $meta_value = '' ) {

			// last post meta
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

		public function before_delete_post( $post_ID ) {

			// We check if the global post type isn't ours and just return
			global $post_type;

			if ( Catalogue::POST_TYPE !== $post_type ) {
				return;
			}

			CatalogueSearchIndex::delete_index( $post_ID );
		}

	}
}
