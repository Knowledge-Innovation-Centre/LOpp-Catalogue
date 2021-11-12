<?php
/**
 * An example view.
 *
 * Layout: layouts/example.php
 *
 * @package LearningOpportunitiesCatalogue
 */

?>
<div class="learning_opportunities_catalogue__view">
	<?php \LearningOpportunitiesCatalogue::render( 'partials/example', [ 'message' => __( 'Hello World!', 'learning_opportunities_catalogue' ) ] ); ?>
</div>
