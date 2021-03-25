<?php
/*
Template Name: Archives Catalogue Item
*/

get_header();

$description = get_the_archive_description();
?>

<?php if ( have_posts() ) : ?>

    <header class="page-header alignwide">
		<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
		<?php if ( $description ) : ?>
            <div class="archive-description"><?php echo wp_kses_post( wpautop( $description ) ); ?></div>
		<?php endif; ?>
    </header><!-- .page-header -->

	<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
				<?php if ( is_singular() ) : ?>
					<?php the_title( '<h1 class="entry-title default-max-width">', '</h1>' ); ?>
				<?php else : ?>
					<?php the_title( sprintf( '<h2 class="entry-title default-max-width"><a href="%s">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
				<?php endif; ?>

            </header><!-- .entry-header -->

            <div class="entry-content">
				<?php
				the_content( function () {
					$continue_reading = sprintf(
					/* translators: %s: Name of current post. */
						esc_html__( 'Continue reading %s', 'twentytwentyone' ),
						the_title( '<span class="screen-reader-text">', '</span>', false )
					);

					return $continue_reading;
				}
				);

				wp_link_pages(
					array(
						'before'   => '<nav class="page-links" aria-label="' . esc_attr__( 'Page', 'twentytwentyone' ) . '">',
						'after'    => '</nav>',
						/* translators: %: page number. */
						'pagelink' => esc_html__( 'Page %', 'twentytwentyone' ),
					)
				);

				?>
            </div><!-- .entry-content -->

            <footer class="entry-footer default-max-width">
            </footer><!-- .entry-footer -->
        </article><!-- #post-${ID} -->

	<?php endwhile; ?>

	<?php
	// the_posts_pagination(
	// 	array(
	// 		/* translators: There is a space after page. */
	// 		'before_page_number' => esc_html__( 'Page ', 'twentytwentyone' ),
	// 		'mid_size'           => 0,
	// 		'prev_text'          => sprintf(
	// 			'%s <span class="nav-prev-text">%s</span>',
	//
	// 			'>',
	// 			sprintf(
	// 			/* translators: %s: The post-type name. */
	// 				esc_html__( 'Newer %s', 'twentytwentyone' ),
	// 				'<span class="nav-short">' . esc_html( $post_type_name ) . '</span>'
	// 			)
	// 		),
	// 		'next_text'          => sprintf(
	// 			'<span class="nav-next-text">%s</span> %s',
	// 			sprintf(
	// 			/* translators: %s: The post-type name. */
	// 				esc_html__( 'Older %s', 'twentytwentyone' ),
	// 				'<span class="nav-short">' . esc_html( $post_type_name ) . '</span>'
	// 			),
	// 			'<'
	// 		),
	// 	)
	// ); ?>

<?php else : ?>
	<?php get_template_part( 'template-parts/content/content-none' ); ?>
<?php endif; ?>

<?php get_footer(); ?>
