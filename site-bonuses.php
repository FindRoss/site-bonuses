<?php
/**
 * Plugin Name:       Site Bonuses
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           1.1.0
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


// Register REST route.
function site_bonuses_endpoint() {
	register_rest_route( 'site-bonuses/v1', '/bonuses', array(
		'methods'             => 'GET',
		'callback'            => 'get_site_bonuses',
		'permission_callback' => '__return_true',
	));
}
add_action( 'rest_api_init', 'site_bonuses_endpoint' );

// REST callback using existing query function.
function get_site_bonuses( $data ) {
	$site_id = isset( $data['site_id'] ) ? absint( $data['site_id'] ) : 0;
	
	if (!$site_id) {
		return new WP_Error( 'missing_param', 'Missing site_id parameter', array( 'status' => 400 ) );
	}

	$query = get_bonuses_by_review_query( $site_id );
	if ( !$query || !$query->have_posts() ) {
		return [];
	}

	$bonuses = [];

	while ( $query->have_posts() ) {
		$query->the_post();

		$id = get_the_ID(); 
		$bonus_link   = get_field('bonus_link', $id);
		$code         = get_field('code', $id);
		$exclusive    = get_field('exclusive', $id);
		$expiry_date  = get_field('expiry_date', $id);
		$marked_expired = get_field('bonus_expired', $id); 
		
		$site = get_field('single_bonus_casino', $id)[0]; 
		
		$details_group = get_field('details_group', $site); 
		$site_name = $details_group['name'] ?? '';
		$site_link = $details_group['affiliate_link'] ?? '';
		
		$media_group = get_field('media_group', $site);
		$site_color = $media_group['theme_color'] ?? '#eeeeee';

		$output_link = $bonus_link ? $bonus_link : $site_link;

		$bonuses[] = array(
			'title'          => get_the_title(),
			'permalink'      => get_the_permalink(),
			'site_name'      => $site_name,
			'link'           => $output_link,
			'code'           => $code ?: false,
			'exclusive'      => (bool) $exclusive,
			'expiry_date'    => $expiry_date ?: false,
			'marked_expired' => (bool) $marked_expired,
		);
	}
	wp_reset_postdata();

	return rest_ensure_response( $bonuses );
}
