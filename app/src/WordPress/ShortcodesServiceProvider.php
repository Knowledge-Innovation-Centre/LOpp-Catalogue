<?php

namespace LearningOpportunitiesCatalogue\WordPress;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Register shortcodes.
 */
class ShortcodesServiceProvider implements ServiceProviderInterface
{
	/**
	 * {@inheritDoc}
	 */
	public function bootstrap($container)
	{
		// phpcs:ignore
		add_shortcode('search-catalog-items', [$this, 'searchCatalogItems']);
		add_shortcode('catalogue-single-page', [$this, 'catalogueSinglePage']);
	}

	public function catalogueSinglePage($atts, $content)
	{
		return '<div id="catalogue-single-page"></div>';
	}

	/**
	 * {@inheritDoc}
	 */
	public function register($container)
	{
		// Nothing to register.
	}

	/**
	 * Example shortcode.
	 *
	 * @param array  $atts
	 * @param string $content
	 *
	 * @return string
	 */
	public function searchCatalogItems($atts, $content)
	{
		return '<div id="search-catalog-items"></div>';
	}
}
