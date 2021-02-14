<?php

namespace LearningOpportunitiesCatalogue_Tests_Wpunit\LearningOpportunitiesCatalogue\Common\Utilities;

use Codeception\TestCase\WPTestCase;
use LearningOpportunitiesCatalogue_Tests_Support\WpunitTester;
use LearningOpportunitiesCatalogue\Common\Utilities\Timing;

class TimingTest extends WPTestCase {

	/**
	 * @var WpunitTester
	 */
	protected $tester;

	/**
	 * @inheritDoc
	 */
	public function setUp(): void {
		// Before...
		parent::setUp();
	}

	/**
	 * @inheritDoc
	 */
	public function tearDown(): void {
		// Your tear down methods here.

		// Then...
		parent::tearDown();
	}

	/**
	 * @return Timing
	 */
	private function make_instance() {
		return new Timing();
	}

	/**
	 * @test
	 */
	public function it_should_be_instantiatable() {
		$sut = $this->make_instance();

		$this->assertInstanceOf( Timing::class, $sut );
	}

}
