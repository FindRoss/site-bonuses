<?php
/**
 * Plugin Name:       Site Bonuses
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       site-bonuses
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_site_bonuses_block_init() {
	register_block_type( __DIR__ . '/build/site-bonuses' );
}
add_action( 'init', 'create_block_site_bonuses_block_init' );

function site_bonuses_endpoint() {
	register_rest_route( 'site-bonuses/v1', '/bonuses', array(
		'methods'  => 'GET',
		'callback' => 'get_bonuses_by_type',
		'permission_callback' => '__return_true', // You can adjust the permission check as needed
	));
}
add_action( 'rest_api_init', 'site_bonuses_endpoint' );

function get_bonuses_by_type( $data ) {
	// You can retrieve your bonuses based on a 'bonus_type' query parameter
	$bonus_type = isset( $data['bonus_type'] ) ? sanitize_text_field( $data['bonus_type'] ) : '';

	// Query bonuses here based on the bonus type
	// Example: Querying custom post type or fetching related ACF fields
	$args = array(
		'post_type' => 'bonus',
		'posts_per_page' => 4, // No limit, adjust as necessary
	);

	if ( $bonus_type ) {
		$args['meta_query'] = array(
			array(
				'key'     => 'bonus_type', // Assume the ACF field name for bonus type
				'value'   => $bonus_type,
				'compare' => '='
			),
		);
	}

	// Query bonuses
	$bonuses_query = new WP_Query( $args );
	$bonuses = array();

	if ( $bonuses_query->have_posts() ) :
		while ( $bonuses_query->have_posts() ) : $bonuses_query->the_post();

			$id = get_the_ID(); 
			$site = get_field('single_bonus_casino'); 
			$site_link = get_field('details_group', $site); 

			
			$data = array(
				'title'   => get_the_title(),
				'bonus_link' => $site_link, 
			);
			$bonuses[] = $data;
		endwhile;
		wp_reset_postdata();
	endif;

	return rest_ensure_response( $bonuses );
}

