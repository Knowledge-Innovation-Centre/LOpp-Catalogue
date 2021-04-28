<?php

namespace LearningOpportunitiesCatalogue\Common\PostTypes;

use Carbon_Fields\Field;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( CatalogueFields::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class CatalogueFields {
		use CarbonFieldsHelper;

		public static function get_general_fields() {
			return [
				[
					'type'     => 'text',
					'slug'     => 'unique_id',
					'xml_slug' => 'learningOpportunity_Identifier',
					'title'    => __( "Unique ID" ),
				],

				[
					'type'  => 'text',
					'slug'  => 'homepage',
					'title' => __( 'Home page' )
				],
				[
					'type'     => 'date',
					'slug'     => 'start_at_date',
					'xml_slug' => 'startAtDate',
					'title'    => __( 'Start date' )
				],
				[
					'type'     => 'date',
					'slug'     => 'ended_at_date',
					'xml_slug' => 'endedAtDate',
					'title'    => __( 'End date' )
				],
				[
					'type'  => 'text',
					'slug'  => 'duration',
					'title' => __( 'Duration' )
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'learning_schedule',
					'xml_slug' => 'learningSchedule',
					'title'    => __( 'Learning schedule' )
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'schedule_information',
					'xml_slug' => 'scheduleInformation',
					'title'    => __( 'Schedule information' )
				],
				[
					'type'     => 'text',
					'slug'     => 'price_details',
					'xml_slug' => 'priceDetails',
					'title'    => __( 'Price details' )
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'provided_by',
					'xml_slug' => 'providedBy',
					'title'    => __( 'Provided By' ),
				],
				[
					'type'     => 'text',
					'slug'     => 'type_of_provider',
					'xml_slug' => 'typeOfProvider',
					'title'    => __( 'Type of provider' ),
				],
				[
					'type'     => 'text',
					'slug'     => 'provided_at',
					'xml_slug' => 'providedAt',
					'title'    => __( 'Provided at' ),
				],
			];
		}

		public static function get_learning_specification_fields() {
			$prefix = 'specifiedBy.learningSpecification.';

			return [
				[
					'type'     => 'text',
					'slug'     => 'learning_specification_id',
					'xml_slug' => $prefix . 'learningSpecificationID',
					'title'    => __( 'Learning specification ID' )
				],
				[
					'type'     => 'text',
					'slug'     => 'identifier',
					'xml_slug' => $prefix . 'identifier',
					'title'    => __( 'Identifier' )
				],
				[
					'type'     => 'select',
					'slug'     => 'learning_opportunity_type',
					'xml_slug' => $prefix . 'learningOpportunityType',
					'title'    => __( 'Learning opportunity type' ),
					'options'  => function () {

						$languages = carbon_get_theme_option( 'learning_opportunity_types' );
						$array     = [ '' => '' ];
						foreach ( $languages as $language ) {
							$array[ $language['name'] ] = $language['name'];
						}

						return $array;
					}
				],
				[
					'type'     => 'text',
					'slug'     => 'iscedf_code',
					'xml_slug' => $prefix . 'ISCEDFCode',
					'title'    => __( 'ISCEDF Code' )
				],
				[
					'type'     => 'text',
					'slug'     => 'education_subject',
					'xml_slug' => $prefix . 'educationSubject',
					'title'    => __( 'Education subject' )
				],
				[
					'type'     => 'text',
					'slug'     => 'ects_credit_points',
					'xml_slug' => $prefix . 'ECTSCreditPoints',
					'title'    => __( 'ECTS credit points' ),
					'subType'  => 'number'
				],
				[
					'type'     => 'select',
					'slug'     => 'language',
					'xml_slug' => $prefix . 'language',
					'title'    => __( 'Language' ),
					'options'  => function () {

						$languages = carbon_get_theme_option( 'languages' );
						foreach ( $languages as $language ) {
							$array[ $language['code'] ] = $language['name'];
						}

						return $array;
					}
				],
				[
					'type'     => 'select',
					'slug'     => 'mode',
					'xml_slug' => $prefix . 'mode',
					'title'    => __( 'Mode' ),
					'options'  => [ '' => '', 'online' => __( 'Online' ) ]
				],

				[
					'type'     => 'select',
					'slug'     => 'learning_settings',
					'xml_slug' => $prefix . 'learningSettings',
					'title'    => __( 'Learning settings' ),
					'options'  => [ '' => '', 'formal' => __( 'Formal' ), 'non-formal' => __( 'Non formal' ) ]
				],
				[
					'type'     => 'text',
					'slug'     => 'target_group',
					'xml_slug' => $prefix . 'targetGroup',
					'title'    => __( 'Target group' )
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'entry_requirements_note',
					'xml_slug' => $prefix . 'entryRequirementsNote',
					'title'    => __( 'Entry requirements note' )
				],
				[
					'type'  => 'separator',
					'slug'  => 'learning_outcomes_seperator',
					'title' => __( 'Learning outcomes' )
				],
				[
					'type'      => 'association',
					'slug'      => 'learning_outcome',
					'xml_slug'  => $prefix . 'learningOutcome.id',
					'title'     => __( 'Learning outcomes' ),
					'post_type' => LearningOutcome::POST_TYPE,
					'class'     => LearningOutcome::class,
					'fields'    => LearningOutcomeFields::class,
					'prefix'    => $prefix . 'learningOutcome',
				],

				[
					'type'  => 'separator',
					'slug'  => 'assessment_specification_seperator',
					'title' => __( 'Assessment specification' )
				],
				[
					'type'     => 'text',
					'slug'     => 'assessment_type',
					'xml_slug' => $prefix . 'assessmentType',
					'title'    => __( 'Assessment type' )
				],
				[
					'type'     => 'text',
					'slug'     => 'assessor_type',
					'xml_slug' => $prefix . 'assessorType',
					'title'    => __( 'Assessor type' )
				],
				[
					'type'     => 'text',
					'slug'     => 'assessment_format',
					'xml_slug' => $prefix . 'assessmentFormat',
					'title'    => __( 'Assessment format' )
				],
				[
					'type'     => 'text',
					'slug'     => 'assessment_language',
					'xml_slug' => $prefix . 'assessmentLanguage',
					'title'    => __( 'Assessment language' )
				],
				[
					'type'     => 'text',
					'slug'     => 'grading_schema',
					'xml_slug' => $prefix . 'gradingSchema',
					'title'    => __( 'Grading schema' )
				],
				[
					'type'     => 'text',
					'slug'     => 'awarding_opportunity',
					'xml_slug' => $prefix . 'awardingOpportunity',
					'title'    => __( 'Awarding opportunity' )
				],
				[
					'type'  => 'separator',
					'slug'  => 'qualification_seperator',
					'title' => __( 'Qualification' )
				],
				[
					'type'     => 'text',
					'slug'     => 'eqf_level',
					'xml_slug' => $prefix . 'qualification.EQFLevel',
					'title'    => __( 'EQF level' )
				],
				[
					'type'     => 'text',
					'slug'     => 'nqf_evel',
					'xml_slug' => $prefix . 'qualification.NQFLevel',
					'title'    => __( 'NQF level' )
				],
			];
		}

		public static function get_contact_fields() {
			$prefix = 'agent.contactInfo.';

			return [
				[
					'type'     => 'rich_text',
					'slug'     => 'note',
					'xml_slug' => $prefix . 'note',
					'title'    => __( 'Note' )
				],
				[
					'type'     => 'text',
					'slug'     => 'contact_form',
					'xml_slug' => $prefix . 'contactForm',
					'title'    => __( 'Contact form' )
				],
			];
		}
	}
}
