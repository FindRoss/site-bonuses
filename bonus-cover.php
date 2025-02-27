<?php 
  $bonus_id = get_the_ID();

  $title       = get_field('bonus_title', $bonus_id);
  $bonus       = get_field('bonus', $bonus_id);
  $code        = get_field('code', $bonus_id);
  $bonusLink   = get_field('bonus_link', $bonus_id);
  $site        = get_field('single_bonus_casino', $bonus_id)[0];
  $exclusive   = get_field('exclusive', $bonus_id);

  $expiry_date = get_field('expiry_date', $bonus_id);
  $marked_expired = get_field('bonus_expired', $bonus_id); 

  $detailsGroup = get_field('details_group', $site);
  $siteName = $detailsGroup['name'];
  $siteLink = $detailsGroup['affiliate_link'];

  $mediaGroup = get_field('media_group', $site);
  $siteColor = $mediaGroup['theme_color'];
  
  $siteColorOutput = $siteColor ? $siteColor : '#eeeeee';
  $outputLink = $bonusLink ? $bonusLink : $siteLink;
  ?>


  <div class="bonus-cover sort-focus">
    
    <div class="bonus-cover__media" style="background-color: <?php echo $siteColorOutput; ?>;">
      <img src="<?php echo get_the_post_thumbnail_url($site, 'site-small-logo'); ?>" width="100" height="50" alt="<?php echo $siteName . ' logo'; ?>" aria-hidden="true">
    </div>
    
    <div>
      <?php if ($expiry_date || $exclusive || $marked_expired) { ?>
        <div class="bonus-cover__pills mb-1">
        
          <?php if ($expiry_date || $marked_expired) : ?>
          <span class="info-pill info-pill-expiry timer" data-expiry="<?php echo $expiry_date ? esc_attr($expiry_date) : 'Expired'; ?>">
            <?php echo get_svg_icon('stopwatch'); ?>
            <span class="ends-in-text"></span>
          </span>
          <?php endif; ?>
          
          <?php if ($exclusive) : ?>
            <span class="info-pill exclusive">
              <?php echo get_svg_icon('star'); ?>
              <span>Exclusive</span>
            </span>
          <?php endif; ?>
        </div>
      <?php }; ?>

      <h3 class="h5">
        <a class="bonus-cover__link" href="<?php the_permalink(); ?>">
          <?php the_title(); ?>
        </a>
      </h3>
      
    </div>
      
    <div class="bonus-cover__ctas">
      <?php if ($code) { ?>
        <a class="button button--small button__outline bonus-code" type="button">
          <span class="bonus-code__code"><?php echo $code; ?></span>
          <span class="bonus-code__icon ms-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
            </svg>
          </span>
        </a>
      <?php }; ?>

      <a href="<?php echo $outputLink; ?>" class="button button--small button__primary" target="_blank">Get Bonus</a>
    </div>
  </div>



