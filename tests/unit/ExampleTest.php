<?php

namespace LearningOpportunitiesCatalogue_Tests_Unit;

use Codeception\Test\Unit;
use LearningOpportunitiesCatalogue_Tests_Support\UnitTester;

class ExampleTest extends Unit {

	/**
	 * @var UnitTester
	 */
	protected $tester;

	public function test_is_null() {
		$this->assertNull( null, 'testing null' );
	}
}
