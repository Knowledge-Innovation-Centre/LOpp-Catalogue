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

		// The frontend bundle (about 600 KB) only drives the catalogue search
		// and single catalogue item pages. Load it there, not on every page.
		if ( static::pageNeedsFrontendScript() ) {
			static::enqueueFrontendScript();
		}

		// Enqueue styles. Kept on every page: the stylesheet also carries global
		// rules (e.g. link decoration, Flowbite import) that themes may rely on.
		$style = LearningOpportunitiesCatalogue::core()->assets()->getBundleUrl( 'frontend', '.css' );

		if ( $style ) {
			LearningOpportunitiesCatalogue::core()->assets()->enqueueStyle(
				'theme-css-bundle-loc',
				$style
			);
		}
	}

	/**
	 * Whether the current request renders something the frontend bundle mounts on:
	 * a single catalogue item, or a post whose content holds a catalogue shortcode.
	 * Shortcodes rendered elsewhere (page builders, widgets) enqueue the bundle
	 * themselves, see ShortcodesServiceProvider.
	 *
	 * @return bool
	 */
	public static function pageNeedsFrontendScript() {
		$needed = false;

		if ( is_singular( \LearningOpportunitiesCatalogue\PostTypes\Catalogue::POST_TYPE ) ) {
			$needed = true;
		} elseif ( is_singular() ) {
			$post = get_post();
			if ( $post && ( has_shortcode( $post->post_content, 'search-catalog-items' )
				|| has_shortcode( $post->post_content, 'search-catalog-page' ) ) ) {
				$needed = true;
			}
		}

		/**
		 * Filters whether the catalogue frontend script loads on this request.
		 *
		 * @param bool $needed
		 */
		return (bool) apply_filters( 'loc_enqueue_frontend_script', $needed );
	}

	/**
	 * Enqueue the frontend script bundle. Safe to call more than once and
	 * late (from a shortcode callback): it is printed in the footer.
	 *
	 * @return void
	 */
	public static function enqueueFrontendScript() {
		LearningOpportunitiesCatalogue::core()->assets()->enqueueScript(
			'theme-js-bundle-loc',
			LearningOpportunitiesCatalogue::core()->assets()->getBundleUrl( 'frontend', '.js' ),
			[ 'jquery', 'jquery-ui-tabs' ],
			true
		);
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
