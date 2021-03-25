<?php
/**
 * The template for displaying catalog item
 *
 */

get_header();

/* Start the Loop */
while ( have_posts() ) :
	the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <header class="entry-header alignwide">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
        </header>

        <div class="entry-content">
			<?php
			the_content();

			$meta = get_metadata();

			?>
            <table>
                <tbody>
                    
                </tbody>
            </table>
			<?php

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


		<?php if ( ! is_singular( 'attachment' ) ) : ?>
			<?php get_template_part( 'template-parts/post/author-bio' ); ?>
		<?php endif; ?>

    </article><!-- #post-${ID} -->

<?php


endwhile; // End of the loop.

get_footer();
