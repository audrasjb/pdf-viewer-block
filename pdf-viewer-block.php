<?php
/**
 * @link              https://jeanbaptisteaudras.com
 * @since             0.1
 * @package           Gutenberg PDF Viewer Block
 *
 * Plugin Name:       Gutenberg PDF Viewer Block
 * Plugin URI:        https://www.whodunit.fr/gutenberg-pdf-viewer-block
 * Description:       A simple and 100% free Gutenberg Block to display PDF Viewers / Readers on your website.
 * Version:           0.1
 * Author:            audrasjb
 * Author URI:        https://jeanbaptisteaudras.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       pdf-viewer-block
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Admin
 */
if (is_admin()) {
	require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
}

/**
 * Public
 */
require_once plugin_dir_path( __FILE__ ) . 'public/public.php';
