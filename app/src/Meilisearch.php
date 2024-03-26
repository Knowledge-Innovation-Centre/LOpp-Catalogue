<?php

namespace LearningOpportunitiesCatalogue;

use Carbon_Fields\Carbon_Fields;
use Exception;
use Meilisearch\Client;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Meilisearch::class ) ) {
	class Meilisearch {
		public function init() {
			Carbon_Fields::boot();
		}

		public static function get_client(): ?Client {
			try {
				$meilisearch_url = carbon_get_theme_option( 'meilisearch_url' );
				$meilisearch_key = carbon_get_theme_option( 'meilisearch_key' );

				return new Client( $meilisearch_url, $meilisearch_key );
			} catch ( Exception $e ) {
				var_dump( $e->getMessage() );

				return null;
			}
		}

		public static function health() {
			$client = self::get_client();

			try {
				return $client->health();
			} catch ( Exception $e ) {
				var_dump( $e->getMessage() );

				return false;
			}
		}

		public static function get_index() {
			try {
				$client = self::get_client();

				return $client->index( carbon_get_theme_option( 'meilisearch_index_key' ) );
			} catch ( Exception $e ) {
				var_dump( $e->getMessage() );

				return null;
			}
		}

		public static function update_api_key() {
			try {
				$client = self::get_client();

				if ( $key = self::get_api_key() ) {
					return $key;
				}

				return $client->createKey( [
					'description' => 'Search patient records key',
					'actions'     => [ 'search' ],
					'indexes'     => [ carbon_get_theme_option( 'meilisearch_index_key' ) ],
					'expiresAt'   => null,
				] );
			} catch ( Exception $e ) {
				var_dump( $e->getMessage() );

				return null;
			}
		}

		public static function get_api_key() {
			try {
				$client = self::get_client();

				foreach ( $client->getKeys() as $key ) {
					if ( ! in_array( 'search', $key->getActions() ) ) {
						continue;
					}
					if ( ! in_array( carbon_get_theme_option( 'meilisearch_index_key' ), $key->getIndexes() ) ) {
						continue;
					}

					return $key;
				}

				return null;
			} catch ( Exception $e ) {
				var_dump( $e->getMessage() );

				return null;
			}
		}

	}
}
