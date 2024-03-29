<?php

namespace LearningOpportunitiesCatalogue\WordPress;

use LearningOpportunitiesCatalogue;
use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Register and enqueues assets.
 */
class AssetsServiceProvider implements ServiceProviderInterface {
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
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueueFrontendAssets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueueAdminAssets' ] );
		add_action( 'wp_footer', [ $this, 'loadSvgSprite' ] );
	}

	/**
	 * Enqueue frontend assets.
	 *
	 * @return void
	 */
	public function enqueueFrontendAssets() {
		// Enqueue the built-in comment-reply script for singular pages.
		if ( is_singular() ) {
			wp_enqueue_script( 'comment-reply' );
		}

		// Enqueue scripts.
		LearningOpportunitiesCatalogue::core()->assets()->enqueueScript(
			'theme-js-bundle-loc',
			LearningOpportunitiesCatalogue::core()->assets()->getBundleUrl( 'frontend', '.js' ),
			[ 'jquery', 'jquery-ui-tabs', 'jquery-ui-tabs' ],
			true
		);

		// Enqueue styles.
		$style = LearningOpportunitiesCatalogue::core()->assets()->getBundleUrl( 'frontend', '.css' );

		if ( $style ) {
			LearningOpportunitiesCatalogue::core()->assets()->enqueueStyle(
				'theme-css-bundle-loc',
				$style
			);
		}
	}

	/**
	 * Enqueue admin assets.
	 *
	 * @return void
	 */
	public function enqueueAdminAssets() {
		// Enqueue scripts.
		LearningOpportunitiesCatalogue::core()->assets()->enqueueScript(
			'theme-admin-js-bundle-loc',
			LearningOpportunitiesCatalogue::core()->assets()->getBundleUrl( 'admin', '.js' ),
			[ 'jquery', 'underscore' ],
			true
		);

		// Enqueue styles.
		$style = LearningOpportunitiesCatalogue::core()->assets()->getBundleUrl( 'admin', '.css' );

		if ( $style ) {
			LearningOpportunitiesCatalogue::core()->assets()->enqueueStyle(
				'theme-admin-css-bundle-loc',
				$style
			);
		}
	}

	/**
	 * Load SVG sprite.
	 *
	 * @return void
	 */
	public function loadSvgSprite() {
		$file_path = implode(
			DIRECTORY_SEPARATOR,
			array_filter(
				[
					plugin_dir_url( LEARNING_OPPORTUNITIES_CATALOGUE_PLUGIN_FILE ),
					'dist',
					'images',
					'sprite.svg'
				]
			)
		);

		if ( ! file_exists( $file_path ) ) {
			return;
		}

		readfile( $file_path );
	}
}
