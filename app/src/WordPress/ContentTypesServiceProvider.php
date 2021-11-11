<?php

namespace LearningOpportunitiesCatalogue\WordPress;

use LearningOpportunitiesCatalogue\AjaxFrontend;
use LearningOpportunitiesCatalogue\PostTypes\Catalogue;
use LearningOpportunitiesCatalogue\PostTypes\CatalogueImporter;
use LearningOpportunitiesCatalogue\PostTypes\Dimension;
use LearningOpportunitiesCatalogue\PostTypes\DimensionSubset;
use LearningOpportunitiesCatalogue\PostTypes\DimensionSubsetItem;
use LearningOpportunitiesCatalogue\PostTypes\LearningOutcome;
use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Register widgets and sidebars.
 */
class ContentTypesServiceProvider implements ServiceProviderInterface
{
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
		add_action( 'init', [$this, 'registerPostTypes'] );
		add_action( 'init', [$this, 'registerTaxonomies'] );



		$catalogue = new Catalogue();
		add_action( 'init', [$catalogue, 'register' ]);
		add_action( 'before_delete_post', [$catalogue, 'before_delete_post' ], 10, 3);
		add_action( 'updated_post_meta', [$catalogue, 'updated_post_meta' ], 10, 4 );
		add_action( 'publish_post', [$catalogue, 'publish_post' ], 10, 2 );
		add_action( 'carbon_fields_register_fields', [$catalogue, 'custom_fields' ]);

		$catalogueImporter = new CatalogueImporter();
		add_action( 'wp_ajax_loc_catalog_import_xml', [$catalogueImporter, 'import' ] );
		add_action( 'wp_ajax_loc_maturity_model_import_xml', [$catalogueImporter, 'import_maturity_model' ] );

		$learning_outcome = new LearningOutcome();
		add_action( 'init', [$learning_outcome, 'register' ] );
		add_action( 'carbon_fields_register_fields', [$learning_outcome, 'custom_fields' ] );

		$dimension = new Dimension();
		add_action( 'init', [$dimension, 'register' ] );
		add_action( 'carbon_fields_register_fields', [$dimension, 'custom_fields' ] );
		$dimensionSubset = new DimensionSubset();
		add_action( 'init', [$dimensionSubset, 'register' ] );
		add_action( 'carbon_fields_register_fields', [$dimensionSubset, 'custom_fields' ] );
		$dimensionSubsetItem = new DimensionSubsetItem();
		add_action( 'init', [$dimensionSubsetItem, 'register' ] );
		add_action( 'carbon_fields_register_fields', [$dimensionSubsetItem, 'custom_fields' ] );


		$ajaxFrontEnd = new AjaxFrontend();
		add_action( 'wp_ajax_get_xml_fields', [$ajaxFrontEnd, 'get_xml_fields'] );
		add_action( 'wp_ajax_nopriv_get_xml_fields', [$ajaxFrontEnd, 'get_xml_fields'] );
		add_action( 'wp_ajax_get_meilisearch_key', [$ajaxFrontEnd, 'get_meilisearch_key'] );
		add_action( 'wp_ajax_nopriv_get_meilisearch_key', [$ajaxFrontEnd, 'get_meilisearch_key'] );
		add_action( 'wp_ajax_reindex_items', [$ajaxFrontEnd, 'reindex_items'] );
		add_action( 'wp_ajax_delete_index_items', [$ajaxFrontEnd, 'delete_index_items'] );
		add_action( 'wp_head', [$ajaxFrontEnd, 'ajax_url'] );

		add_filter( 'the_content', [$catalogue, 'add_content_after' ]);

		add_action( 'admin_bar_menu', [$this, 'my_ajax_button'], 100 );
		add_action( 'admin_head', [$this, 'my_action_javascript'] );
	}

	/**
	 * Register post types.
	 *
	 * @return void
	 */
	public function registerPostTypes() {


		// phpcs:disable
		/*
		register_post_type(
			'learning_opportunities_catalogue_custom_post_type',
			array(
				'labels'              => array(
					'name'               => __( 'Custom Types', 'learning_opportunities_catalogue' ),
					'singular_name'      => __( 'Custom Type', 'learning_opportunities_catalogue' ),
					'add_new'            => __( 'Add New', 'learning_opportunities_catalogue' ),
					'add_new_item'       => __( 'Add new Custom Type', 'learning_opportunities_catalogue' ),
					'view_item'          => __( 'View Custom Type', 'learning_opportunities_catalogue' ),
					'edit_item'          => __( 'Edit Custom Type', 'learning_opportunities_catalogue' ),
					'new_item'           => __( 'New Custom Type', 'learning_opportunities_catalogue' ),
					'search_items'       => __( 'Search Custom Types', 'learning_opportunities_catalogue' ),
					'not_found'          => __( 'No custom types found', 'learning_opportunities_catalogue' ),
					'not_found_in_trash' => __( 'No custom types found in trash', 'learning_opportunities_catalogue' ),
				),
				'public'              => true,
				'exclude_from_search' => false,
				'show_ui'             => true,
				'capability_type'     => 'post',
				'hierarchical'        => false,
				'query_var'           => true,
				'menu_icon'           => 'dashicons-admin-post',
				'supports'            => array( 'title', 'editor', 'page-attributes' ),
				'rewrite'             => array(
					'slug'       => 'custom-post-type',
					'with_front' => false,
				),
			)
		);
		*/
		// phpcs:enable
	}

	/**
	 * Register taxonomies.
	 *
	 * @return void
	 */
	public function registerTaxonomies() {
		// phpcs:disable
		/*
		register_taxonomy(
			'learning_opportunities_catalogue_custom_taxonomy',
			array( 'post_type' ),
			array(
				'labels'            => array(
					'name'              => __( 'Custom Taxonomies', 'learning_opportunities_catalogue' ),
					'singular_name'     => __( 'Custom Taxonomy', 'learning_opportunities_catalogue' ),
					'search_items'      => __( 'Search Custom Taxonomies', 'learning_opportunities_catalogue' ),
					'all_items'         => __( 'All Custom Taxonomies', 'learning_opportunities_catalogue' ),
					'parent_item'       => __( 'Parent Custom Taxonomy', 'learning_opportunities_catalogue' ),
					'parent_item_colon' => __( 'Parent Custom Taxonomy:', 'learning_opportunities_catalogue' ),
					'view_item'         => __( 'View Custom Taxonomy', 'learning_opportunities_catalogue' ),
					'edit_item'         => __( 'Edit Custom Taxonomy', 'learning_opportunities_catalogue' ),
					'update_item'       => __( 'Update Custom Taxonomy', 'learning_opportunities_catalogue' ),
					'add_new_item'      => __( 'Add New Custom Taxonomy', 'learning_opportunities_catalogue' ),
					'new_item_name'     => __( 'New Custom Taxonomy Name', 'learning_opportunities_catalogue' ),
					'menu_name'         => __( 'Custom Taxonomies', 'learning_opportunities_catalogue' ),
				),
				'hierarchical'      => true,
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => array( 'slug' => 'custom-taxonomy' ),
			)
		);
		*/
		// phpcs:enable
	}



	public function my_ajax_button( $admin_bar ) {
		$admin_bar->add_menu( [
			'id'    => 'reindex-items',
			'title' => 'Reindex all items',
			'href'  => '#',
			'meta'  => [
				'title' => __( 'Reindex items' ),
				'class' => 'reindex-items',
			],
		] );
		$admin_bar->add_menu( [
			'id'    => 'delete-index-items',
			'title' => 'Delete index',
			'href'  => '#',
			'meta'  => [
				'title' => __( 'Delete index' ),
				'class' => 'delete-index-items',
			],
		]);
	}

	// add_action( 'admin_head', 'my_action_javascript' );

	function my_action_javascript() {
		?>
		<script type="text/javascript">
		jQuery(document).ready(function ($) {

			$('.reindex-items').click(function () {
				let data = {
					action: 'reindex_items',
				};

				// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
				$.post(ajaxurl, data, function (response) {
					alert('Reindex complete: ' + response);
				});
			});
			$('.delete-index-items').click(function () {
				let data = {
					action: 'delete_index_items',
				};

				// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
				$.post(ajaxurl, data, function (response) {
					alert('Delete index complete: ' + response);
				});
			});


		});
		</script>
		<?php
	}

}
