<?php

namespace LearningOpportunitiesCatalogue\Shortcodes;

use LearningOpportunitiesCatalogue\Common\Utilities\Http;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Catalog_Item_Search::class ) ) {
	/**
	 * Create `[catalog_item_search]` to get a URL query parameter.
	 *
	 * TODO: This is just a demo shortcode. Remove this class unless you want to keep this little utility.
	 *
	 * @see \LearningOpportunitiesCatalogue\Shortcodes\Manage::$shortcode_classes
	 */
	final class Catalog_Item_Search extends Shortcode {
		/**
		 * @inheritDoc
		 */
		public function get_defaults(): array {
			return [
				'parameter'   => '',
				// Required
				'default'     => '',
				// The default value to return if the parameter is not present.
				'escape_with' => 'esc_html',
				// '' to NOT pass the result through `esc_html()` (scary - don't trust it) - but it is the only way to get a non-string result, which may be what you are wanting.
			];
		}

		/**
		 * @inheritDoc
		 *
		 * @return mixed The value of the query parameter, if any.
		 * @see \LearningOpportunitiesCatalogue\Common\Utilities\Http::get_request_param()
		 *
		 */
		public function process_shortcode(
			array $atts = [],
			string $content = ''
		) {


			return '<div id="search-catalog-items"></div>';
		}
	}
}
