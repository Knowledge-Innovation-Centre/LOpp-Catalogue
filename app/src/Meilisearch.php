<?php

namespace LearningOpportunitiesCatalogue;

use Exception;
use MeiliSearch\Client;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Meilisearch::class ) ) {

	class Meilisearch {
		public function init() {
			\Carbon_Fields\Carbon_Fields::boot();
		}

		public static function get_client() {
			try {
			$meilisearch_url = carbon_get_theme_option( 'meilisearch_url' );
			$meilisearch_key = carbon_get_theme_option( 'meilisearch_key' );

				return new Client( $meilisearch_url, $meilisearch_key );
			} catch (Exception $e) {
				return null;
			}
		}

		public static function health() {
			$client = self::get_client();

			try {
				return $client->stats();
			} catch ( Exception $e ) {
				return false;
			}

		}

		public static function get_index( $post_type ) {
			try {
				$client = self::get_client();

				return $client->index( $post_type );
			} catch (Exception $e) {
				return null;
			}
		}

	}
}
