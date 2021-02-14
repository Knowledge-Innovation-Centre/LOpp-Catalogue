<?php

namespace LearningOpportunitiesCatalogue_Tests_Wpunit\LearningOpportunitiesCatalogue\Common\Utilities;

use Codeception\TestCase\WPTestCase;
use LearningOpportunitiesCatalogue_Tests_Support\WpunitTester;
use LearningOpportunitiesCatalogue\Common\Utilities\Links;

class LinksTest extends WPTestCase {

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
	 * @return Links
	 */
	private function make_instance() {
		return new Links();
	}

	/**
	 * @test
	 */
	public function it_should_be_instantiatable() {
		$sut = $this->make_instance();

		$this->assertInstanceOf( Links::class, $sut );
	}

}
