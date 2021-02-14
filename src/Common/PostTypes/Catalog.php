<?php

namespace LearningOpportunitiesCatalogue\Common\PostTypes;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Catalog::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class Catalog {
		public function register() {
			register_extended_post_type( 'loc_catalogue_item', [
				'admin_cols' => $this->get_admin_cols(),
			], [

				# Override the base names used for labels:
				'singular' => 'Catalog item',
				'plural'   => 'Catalog items',

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
	}
}
