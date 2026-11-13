<?php

namespace LearningOpportunitiesCatalogue\WordPress;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Register shortcodes.
 */
class ShortcodesServiceProvider implements ServiceProviderInterface {
	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		// phpcs:ignore
		add_shortcode( 'search-catalog-items', [ $this, 'searchCatalogItems' ] );
		add_shortcode( 'search-catalog-page', [ $this, 'searchCatalogPage' ] );
	}

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
		// Nothing to register.
	}

	/**
	 * Example shortcode.
	 *
	 * @param array $atts
	 * @param string $content
	 *
	 * @return string
	 */
	public function searchCatalogItems( $atts, $content ) {
		AssetsServiceProvider::enqueueFrontendScript();

		// .loc-catalogue scopes the catalogue styles; it stays after Vue replaces the inner div.
		return '<div class="loc-catalogue"><div id="search-catalog-items"></div></div>';
	}

	public function searchCatalogPage( $atts, $content ) {
		global $post;

		AssetsServiceProvider::enqueueFrontendScript();

		return '<div class="loc-catalogue"><div id="catalogue-single-page" data-post-id="' . ( $post->ID ) . '"></div></div>';
	}
}
