<?php

namespace LearningOpportunitiesCatalogue\WordPress;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Register admin-related entities, like admin menu pages.
 */
class AdminServiceProvider implements ServiceProviderInterface {
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
		add_action( 'admin_menu', [$this, 'registerAdminPages'] );
	}

	/**
	 * Register admin pages.
	 *
	 * @return void
	 */
	public function registerAdminPages() {
		add_menu_page( __('LOC importer', 'learning-opportunities-catalogue'),__('LOC importer', 'learning-opportunities-catalogue'), 'administrator', 'learning-opportunities-catalogue-settings', [
			$this,
			'importer_page'
		] );

		if ( ! empty( $hook_suffix ) ) {
//			add_action( "admin_print_scripts-{$hook_suffix}", [ $this, 'enqueue_settings_page_assets' ] );
		}
		// phpcs:ignore
		// add_theme_page( string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', int $position = null );
	}


	public function importer_page(): void {
		if ( ! current_user_can( 'administrator' ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'learning-opportunities-catalogue' ) );
		}

		printf(
			'<div class="wrap" id="vue-admin"></div>',
			'learning-opportunities-catalogue'
		);
	}
}
