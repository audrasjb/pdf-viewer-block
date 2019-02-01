<?php
/**
 * @since      0.1
 *
 * @package    pdf-viewer-block
 * @subpackage pdf-viewer-block/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * @package    pdf-viewer-block
 * @subpackage pdf-viewer-block/admin
 * @author     audrasjb <audrasjb@gmail.com>
 */

/**
 *
 * Enqueue styles and scripts
 *
 */
 	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	add_action( 'admin_enqueue_scripts', 'gpvb_enqueue_styles_admin' );
	function gpvb_enqueue_styles_admin() {
		wp_enqueue_style( 
			'gpvb-admin-styles', 
			plugin_dir_url( __FILE__ ) . 'min/style.min.css', 
			array(), 
			'', 
			'all' 
		);
		wp_register_script(
			'gpvb-admin-scripts',
			plugins_url( 'min/scripts-min.js', __FILE__ ),
			array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'min/scripts-min.js' ),
			true
		);
		wp_enqueue_script( 'gpvb-admin-scripts' );
	}
	register_block_type( 'pdf-viewer-block/standard', 
		array(
			'editor_script' => 'gpvb-admin-scripts',
			'editor_style'  => 'gpvb-admin-styles',
		)
	);

