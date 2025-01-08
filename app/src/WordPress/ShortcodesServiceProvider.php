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
		return '<div id="search-catalog-items"></div>';
	}

	public function searchCatalogPage( $atts, $content ) {
		global $post;

		return '<div id="catalogue-single-page" data-post-id="' . ( $post->ID ) . '"></div>';
	}
}
